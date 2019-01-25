import axios from 'axios';

const ignoredStories = [
  '151262175', '148077489', '151620080', '150190185', '153578787', '155640854', '157405095', '158120117', '150190185', '159776171'
];

function url(storyNumber) {
  return `https://www.pivotaltracker.com/services/v5/projects/1126018/stories/${storyNumber}`;
}

const privates = new WeakMap();

export default class Tracker_helper {
  constructor(trackerToken) {
    privates.set(this, {trackerToken});
  }

  async getStories(storyNumbers) {
    const {trackerToken} = privates.get(this);
    const stories = {};
    await Promise.all(storyNumbers
      .filter(storyNumber => ignoredStories.indexOf(storyNumber) === -1)
      .map(storyNumber =>
        axios.get(url(storyNumber), {headers: {'X-TrackerToken': trackerToken}})
          .then(({data, data: {id}}) => stories[id] = data)
          .catch(console.error)));
    return stories;
  }
};
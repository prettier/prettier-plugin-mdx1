import visitorKeys from "./visitor-keys.evaluate.js";

const getVisitorKeys = (node) => visitorKeys[node.type];

export default getVisitorKeys;

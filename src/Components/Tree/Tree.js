import TreeElement from './TreeNode';
class Tree {
    constructor(value) {
        this.Length = 1;
        this.MainNode = new TreeElement(value, null, this);
    }
    FindNodeById(id) {
        return this.MainNode.FindNode(id)
    }
    FindTaskBySearch(string) {
        return this.MainNode.FindTask(string)
    }
}
export default Tree;

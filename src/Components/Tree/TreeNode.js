import leftColumnConfig from "../../Constants/LeftColumnConfig";

class TreeNode {
    constructor(type, parent = null, tree = undefined) {
        this.value = this.GenerateDefaulValue(type);
        this.parent = parent;
        this.tree = tree;
        this.children = [];
        this.id = this.GenerateID();
        if (this.parent) this.parent.mapId.set(this.id, this);
        // this.id = id;
        // if (this.value){
            this.hasChildren = this.GenerateChildrenAvailable(type);
            this.hasMethods = this.GenerateMethodsAvailable(type);
        // }
       

        // if (this.parent) this.parent.mapId.set(this.id, this);
    }
    GenerateDefaulValue(type){
        const newDefaulValue = {...leftColumnConfig.find(item => item.type == type)}
        return newDefaulValue
        
    }
    GenerateChildrenAvailable(type) {
        const foundItem = {...leftColumnConfig.find(item => item.type == type)}
        return foundItem.hasChildren
    }
    GenerateMethodsAvailable(type) {
        const foundItem = {...leftColumnConfig.find(item => item.type == type)}
        return foundItem.hasMethods
    }
    GenerateID() {
        if (!this.mapId) this.mapId = new Map();
        var new_index = 1;
        while (true) {
            const generated = this.parent ? this.parent.id + "." + new_index : new_index;
            console.log(this.parent?.mapId.has(generated))

            if (this.parent?.mapId.has(generated)) {
                new_index++;
                continue;
            } else {
                return generated;
            }
        }
    }

    AddChild(type) {
        this.children.push(new TreeNode(type, this, this.tree));
    }

    AddChildNode(node, index) {
        // console.log('index', index)
        this.children.splice(index, 0, node);
        node.parent = this;
    }

    ChangeParent(new_parent, index) {
        this.parent.DeleteChildNode(this);
        new_parent.AddChildNode(this, index);
    }

    DeleteChildNode(node) {
        return this.children.splice(this.children.indexOf(node), 1);
    }
   
    CopyNode(node) {
        const newNode = new TreeNode(node.value.type, this, this.tree)
        newNode.value = {...node.value}
        node.children.forEach(child => newNode.CopyNode(child))
        this.children.push(newNode)
    }

    FindNode(id) {
        if (this.id == id) {
            return this;
        }

        if (this.children.length > 0) {
            for (let i = 0; i < this.children.length; i++) {
                // console.log('new root', newRoot)

                const result = this.children[i].FindNode(id)
                // console.log('result', result)
                if (result !== null)
                    return result
            }
        }
        return null




    }
}

export default TreeNode;
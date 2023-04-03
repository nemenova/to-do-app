const leftColumnConfig = [
    {
        type: 'MainNode',
        hasChildren: ['task'],
       

    },
    {
        title: 'Task',
        displayName: 'Task',
        isAvailable: true,
        type: 'task',
        hasChildren: ['subtask'],
        hasMethods: ['delete', 'copy'],
        isDone: false,
   
    },
    {
        title: 'Subtask',
        type: 'subtask',
        displayName: 'Subtask',
        isAvailable: true,
        hasChildren: ['subtask'],
        hasMethods: ['delete', 'copy'],
        isDone: false,

    },

];
export default leftColumnConfig;
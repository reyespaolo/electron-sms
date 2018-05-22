module.exports = [
  {
    label:  'Electron',
    submenu: [
      {label: 'Item One'},
      {label: 'Item Two'}
    ]
  },
  {
    label: 'Actions',
    submenu: [
      {
        label:'Action One',
        click: () => {
          console.log('Action One Clicked')
        },
        accelerator: 'Shift+Alt+G' // Shortcut
      },
      {
        label:'Action Two',
        submenu: [
          {label:'Submenu for Action Two'},
          {label:'Disabled Command for Action Two', enabled: false}
        ]
      },
      {label:'Action Three'}
    ]
  },
  {
    label:  'System',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        role: 'toggledevtools'
      },
      {role: 'togglefullscreen'},
      {role: 'undo'},
      {role: 'redo'},
      {role: 'copy'},
      {role: 'paste'}


    ]
  },
]

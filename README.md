  ## Aproach To Content Editor
    Since I decided to support the infinite numbers of layout, I've need to create components dynamically. To do so I've decided to use ComponentFactory.I was rendering the div's (Called them container on the UI) in the HTML's, and creating the components dynamically in .ts file of the component using ComponentFactory. I needed the hold the container data as tree but for performance concerns, I've hold the data as flat and use the id field to map the parent to children. And for to be able pass the data to component I've created a config file called input definitions, which holds the component's input definitions for further use (e.g. Changing the candidates name, adding an experience ). This was the most time consuming module in the app. Since a user can add any layout they want, it was hard to maintain intuitivity. For example, where should be the add button? How I'll handle the paddings in edit mode? How can user see the final result? Some good some bad, I've implement the module successfuly ( with of course some bugs, just like every other successful implementation :) )
  <img src="content-editor-in-edit-mode.png" alt="drawing" style="width:500px;"/> \
  As you can see the above screen shot, you can add, delete both component and container inside whichever container you want and change the alignments of them with flex properties such as direction, align items etc. Also you're able to change the document's content. By clicking the ctrl button you're able to close the editing mode and able to see the final result; \
<img src="content-editor-in-read-mode.png" alt="drawing" style="width:500px;"/> \
  Content Editor's every primitive components such as text, divider, heading, text, icon, is accepts the html, in other saying you can do anything with HTML. And the whole content editor is also ready to support HTML and CSS.
  The other components designed to ease the UX such as Header Section and Experience section isn't supports HTML inputs but like I've said in the very beginning of this doc, the architecture is also supports the container to component which means that you can create anything using this editor ( You can simply create a landing page) and save them as Components and those components will also support the HTML.

  ## Libraries Used
  - NG Zorro (UI Library)
  - pdfjs & html2canvas (to export the html as pdf)
  - ngx-colorpicker ( UI Component, to be able to change the background color and for feature theme editor)
  - uuid (to add unique identifier to content tree definition)





    

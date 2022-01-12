//get your notes
const getSavedNotes=() =>
{ 
    const notesJSON=localStorage.getItem('notes')
    try
    {
      if(notesJSON!==null)
      {
      return JSON.parse(notesJSON)
      }
      else
      {
         return []
      } 
   }
   catch(e)
   {
      return []
   }
}
//save notes to the local storage
const savedNotes= (notes) =>  
{
   localStorage.setItem('notes',JSON.stringify(notes))
}
//remove note
const removeNote= (id) =>
{
   const noteIndex=notes.findIndex( (note) => note.id===id)
   if(noteIndex>-1)
   notes.splice(noteIndex,1);

}
//generate dom
const generateNoteDOM= (note) =>
{
      const noteEl=document.createElement('a');
      const textEl=document.createElement('p');
      const statusEl=document.createElement('p');
      //Setup the note title text
      if(note.title.length > 0)
      {
         textEl.textContent=note.title
      }
      else
      {
         textEl.textContent='Unnamed Note'
      }
      textEl.classList.add("list-item__title")
      noteEl.appendChild(textEl)

      noteEl.setAttribute('href',`./edit.html#${note.id}`)
      noteEl.classList.add('list-item')

      statusEl.textContent=generateLastEdited(note.updatedAt)
      statusEl.classList.add('list-item__subtitle')
      
      noteEl.appendChild(statusEl)

      return noteEl
}

//Sort your Notes
const sortNotes= (notes,sortBy) =>
{
   if(sortBy === 'byEdited')
   return notes.sort((a,b) =>
   {
      if(a.updatedAt > b.updatedAt)
      return -1
      else if(a.updatedAt < b.updatedAt)
      return 1
      else 
      return 0
   })
   else if(sortBy === 'byCreated')
   {
      return notes.sort((a,b) =>
      {
         if(a.createdAt > b.createdAt)
         return -1
         else if (a.createdAt < b.createdAt)
         return 1
         else 
         return 0
      })
   }
   else if(sortBy === 'alphabetical')
   {
      return notes.sort((a,b) =>
      {
         if(a.title.toLowerCase() < b.title.toLowerCase())
         return -1
         else if(a.title.toLowerCase() > b.title.toLowerCase())
         return 1
         else 
         return 0
      })
   }
   else 
   return notes
}

//render
const renderNotes=(notes,filters) =>
{
   let notesEl=document.querySelector('#notes')
   notes=sortNotes(notes,filters.sortBy)
   const filteredNotes=notes.filter((note)=>note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
   // console.log(filteredNotes);
      notesEl.innerHTML = ''

   if(filteredNotes.length>0)
   {
      filteredNotes.forEach((note)=>
   {
      const noteEl=generateNoteDOM(note)
      notesEl.appendChild(noteEl)
   })
   }
   else
   {
      const emptyMessage=document.createElement('p')
      emptyMessage.textContent='No notes to show'
      emptyMessage.classList.add('empty-message')
      notesEl.appendChild(emptyMessage)
   }

   
}

//generate the last edited message
const generateLastEdited=(timestamp)=>
{
   return `Last edited ${moment(timestamp).fromNow()}` 
}

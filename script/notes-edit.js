const remove=document.querySelector('#remove-note')
const titleElement=document.querySelector('#note-title')
const bodyElement=document.querySelector('#note-body')
const dateElement=document.querySelector('#last-edited')
const noteId=location.hash.substring(1)
let notes = getSavedNotes()

let note=notes.find((note)=> note.id === noteId)

if(note===undefined)
{
    location.assign('./index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input',(e)=>
{
    note.title=e.target.value
    note.updatedAt=moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    savedNotes(notes)
})

bodyElement.addEventListener('input',(e)=>
{
    note.body=e.target.value
    note.updatedAt=moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    savedNotes(notes)
})

remove.addEventListener('click',(e)=>
{
    removeNote(note.id)
    savedNotes(notes)
    location.assign('./index.html')
})

//syncing data across pages
window.addEventListener('storage',(e)=>
{
   if(e.key === 'notes')
   {
       notes = JSON.parse(e.newValue)
       let note=notes.find((note)=>note.id === noteId)
        if(note===undefined)
        {
            location.assign('./index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body 
    }
})

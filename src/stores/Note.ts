import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDialog } from 'primevue/usedialog';
import NoteEditing from '@/components/dialogs/NoteEditing.vue';
import type { Note } from '@/types/types';

export const useNoteStore = defineStore('note', () => {
  const dialog = useDialog()

  const deleteNote = (id : string , callBackFn : Function) => {
    let notesMap = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')!) : {}
    delete notesMap[id]
    localStorage.setItem('notes', JSON.stringify(notesMap))
    callBackFn()
  }

  const updateStatus = (id : string , callBackFn : Function) => {
    let notesMap : Record<string , Note> = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')!) : {}
    notesMap[id].noteStatus = notesMap[id].noteStatus == 'pending' ? 'completed' : 'pending'
    localStorage.setItem('notes', JSON.stringify(notesMap))
    callBackFn();
  }
  
  const openNoteEditingDialog = ( callBackFn : Function , Note? : Note) => {
      dialog.open(NoteEditing, {
          props: {
              style : {'width' : '50vw'},
              header : `Note ${Note ? 'Update' : 'Create'}`,
              closable : true,
              modal: true,
              dismissableMask: true
          },
          onClose : (option) => {
            callBackFn()
          },
          data: {
            ...Note
          },
      });
  }

  return { openNoteEditingDialog , deleteNote , updateStatus }
})

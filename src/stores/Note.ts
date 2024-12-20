import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDialog } from 'primevue/usedialog';
import NoteEditing from '@/components/dialogs/NoteEditing.vue';
import type { Note } from '@/types/types';
import { useToast } from "primevue/usetoast";

export const useNoteStore = defineStore('note', () => {
  const dialog = useDialog()
  const toast = useToast();


  const deleteNote = (id : string , callBackFn : Function) => {
    let notesMap = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')!) : {}
    delete notesMap[id]
    localStorage.setItem('notes', JSON.stringify(notesMap))
    callBackFn()
    toast.add({ severity: 'success', summary: 'Deleted!', detail: 'Note has been deleted successfully.', life: 3000 });
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
            toast.add({ severity: 'success', summary: 'Saved!', detail: 'Note has been saved successfully.', life: 3000 });
          },
          data: {
            ...Note
          },
      });
  }

  return { openNoteEditingDialog , deleteNote , updateStatus }
})

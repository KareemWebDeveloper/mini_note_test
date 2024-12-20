<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import { useNoteStore } from '@/stores/Note';
import type { Note } from '@/types/types';
import Tag from 'primevue/tag';
import Select from 'primevue/select';
const noteStore = useNoteStore()
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    noteDescription: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    noteStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const notes = ref<Note[]>([
  {
    noteTitle : 'Test 1',
    noteDescription : 'Description Test',
    noteStatus : 'completed',
  }
])

onMounted(() => {
  refreshNotes()
})

const refreshNotes = () => {
  let notesMap = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')!) : {}
  notes.value = Object.values(notesMap)
}

</script>
<template>
  <div class="p-3">
    
    <DataTable v-model:filters="filters" :value="notes" filterDisplay="menu" showGridlines stripedRows paginator :rows="5" :globalFilterFields="['noteTitle']"
     :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex p-3 align-items-center justify-content-between">
              <h2 class="text-center">Mini Note</h2>
              
              <div class="flex align-items-center gap-2">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
                <Button @click="noteStore.openNoteEditingDialog(refreshNotes)" label="Add New Note" icon="pi pi-plus"></Button>
              </div>
          </div>
        </template>
        <Column field="noteTitle" header="Title"></Column>
        <Column field="noteDescription" header="Description"></Column>
        <Column field="noteStatus" header="Status">
          <template #body="slotProps">
            <div class="flex gap-2 align-items-center">
              <Tag :severity="slotProps.data.noteStatus == 'completed' ? 'success' : 'warning'">{{ slotProps.data.noteStatus }}</Tag>
            </div>
        </template>
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="['completed' , 'pending']" placeholder="Choose Status" />
        </template>
        </Column>
        <Column header="Actions" style="width : 35%">
          <template #body="slotProps">
              <div class="flex gap-2 align-items-center">
                <Button @click="noteStore.deleteNote(slotProps.data.id, refreshNotes)" icon="pi pi-trash"></Button>
                <Button @click="noteStore.openNoteEditingDialog(refreshNotes , slotProps.data)" icon="pi pi-pencil"></Button>
                <Button @click="noteStore.updateStatus(slotProps.data.id ,  refreshNotes);" severity="success" label="Mark As Completed" v-if="slotProps.data.noteStatus === 'pending'" icon="pi pi-check-circle"></Button>
                <Button @click="noteStore.updateStatus(slotProps.data.id ,  refreshNotes);" v-else label="Return To Pending" icon="pi pi-refresh"></Button>
              </div>
          </template>
        </Column>
    </DataTable>
  </div>
</template>

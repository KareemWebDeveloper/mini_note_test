<script setup lang="ts">
import type { Note } from "@/types/types";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { inject, ref } from "vue";
const dialogRef: any = inject('dialogRef');
const noteId = ref(dialogRef.value.data && dialogRef.value.data.id ? dialogRef.value.data.id : '');
const noteTitle = ref(dialogRef.value.data && dialogRef.value.data.noteTitle ? dialogRef.value.data.noteTitle : '');
const noteDescription = ref(dialogRef.value.data && dialogRef.value.data.noteDescription ? dialogRef.value.data.noteDescription : '');

const saveNote = () => {
    const notes : Record<string , Note>  = JSON.parse(localStorage.getItem('notes') || '{}');
    const id = noteId.value ? noteId.value : Object.keys(notes).length + 1 + noteTitle.value
    notes[id] = {
        id: id,
        noteTitle : noteTitle.value,
        noteDescription: noteDescription.value,
        noteStatus : 'pending'
    }
    localStorage.setItem('notes', JSON.stringify(notes));
}


const handleFormSubmission = () => {
    if (!noteTitle.value || !noteDescription.value) {
        return;
    }
    saveNote()
    dialogRef.value.close();
}
</script>

<template>
    <div class="flex flex-column gap-3 justify-content-center align-items-center">
        <IconField>
            <InputIcon>
                <i class="pi pi-align-center" />
            </InputIcon>
            <InputText class="w-30rem" v-model="noteTitle" placeholder="Note Title" />
        </IconField>
        <IconField>
            <InputIcon>
                <i class="pi pi-align-justify" />
            </InputIcon>
            <InputText class="w-30rem" v-model="noteDescription" placeholder="Note Description" />
        </IconField>
        <Button @click="handleFormSubmission" label="Submit" icon="pi pi-check"></Button>
    </div>
</template>
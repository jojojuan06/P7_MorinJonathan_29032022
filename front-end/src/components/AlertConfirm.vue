<template>
    <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="600">
      <v-card>
        <div class="card_header">
            <v-card-title class="text-h5">
            {{title}}
            </v-card-title>
            <v-icon class="--color">mdi-alert</v-icon>
        </div>
        <v-card-text>{{description}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- envoyer $emit l'evenement au parent -->
          <v-btn  @click="$emit('closeAlert')">
            Annuler
          </v-btn>
          <v-btn  @click="$emit('comfirm')">
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>    

<script>

export default {
    name: 'AlertConfirm',
    props: {
        title: {
        type:String,    
        default:"",
        },
        description:{
        type:String,
        default:""
        },
        open: {
            type:Boolean,
            default: false
        }   
    },
}
</script>

<style scoped>
.v-icon.--color{
    color: orangered;
    font-size: 32px;
}
.text-h5 {
    color: #d1515a;
}
</style>
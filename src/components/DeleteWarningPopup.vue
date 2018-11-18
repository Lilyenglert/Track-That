<template>
  <transition name="popup">
  <div class="popup-backdrop">
    <div class="popup">
      <h2>Are you sure you want to delete this?  This can't be undone.</h2>
      <div id="save-back">
      <v-btn id="small-button" @click="yes">Yes, delete it.</v-btn>
      <v-btn id="small-button" @click="no">No, keep it.</v-btn>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'DeleteWarningPopup',
  methods: {
    yes () {
      this.$emit('delete');
    },
    no () {
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


h2{
  margin-bottom: 5px;
}
  .popup-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    align-content: center;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    padding: 30px;
    box-shadow: 1px 1px 10px rgb(197, 197, 197);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .popup-enter {
  opacity: 0;
}

.popup-leave-active {
  opacity: 0;
}

.popup-enter .popup-container,
.popup-leave-active .popup-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#save-back{
  display: inline;
  text-align: center;
}

</style>

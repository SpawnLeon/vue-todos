<template>
  <div class="row">
    <div class="col s6 offset-s3">

      <div v-if="task">
        <h1>{{ task.title }}</h1>
        <form @submit.prevent="submitHandler">

          <div class="chips"
               ref="chips"></div>

          <div class="input-field">
          <textarea style="min-height: 150px;"
              v-model="description"
              id="description"
              class="materialize-textarea"
              data-length="120"></textarea>
            <label for="description"></label>
            <span class="character-counter"
                  style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
          </div>
          <input type="text"
                 ref="datepicker">
          <button class="btn"
                  type="submit">Update task
          </button>
        </form>
      </div>
      <p v-else>Task {{ this.$route.params.id }} not found</p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'create',
  data() {
    return {
      description: '',
      chips: null,
      date: null,
    };
  },
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  methods: {
    submitHandler() {
      const task = {
        id: this.task.id,
        description: this.description,
        tags: this.chips.chipsData,
        date: this.date.date,
      };
      this.$store.dispatch('updateTask', task);
      this.$router.push('/list');
    },
  },
  mounted() {
    this.description = this.task.description;

    this.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.task.tags,
    });

    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
    });
    setTimeout(() => window.M.updateTextFields(), 0);
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  },
};
</script>

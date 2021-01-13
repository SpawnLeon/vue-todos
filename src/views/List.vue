<template>
  <div>
    <h1>List</h1>
    <hr>
    <table v-if="tasks.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Date</th>
        <th>Description</th>
        <th>Status</th>
        <th>Open</th>
      </tr>
      </thead>
      <tr v-for="(task, idx) of tasks"
          :key="task.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ task.title }}</td>
        <td>{{ new Date(task.date).toLocaleDateString() }}</td>
        <td class="td">
          <div class="text">{{ task.description }}</div>
        </td>
        <td>
          <span
              class="badge new">{{ task.status }}</span>
        </td>
        <td>
          <router-link tab="button"
                       class="btn btn-small"
                       :to="`/task/${task.id}`">Open
          </router-link>
        </td>
      </tr>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  name: 'List.vue',
  data() {
    return {};
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
  },
};
</script>

<style scoped>
.badge {
  vertical-align : middle;
}

.text {
  overflow      : hidden;
  text-overflow : ellipsis;
  white-space   : nowrap;
}

td {
  max-width : 400px;
}
</style>

<template>
  <div class="section-header">
    <h3>Staff</h3>
    <div class="section-header-input">
      <label for="staff-search">Search</label>
      <input
        type="text"
        name="staff-search"
        id="staff-search"
        placeholder="Type something..."
        v-model="staffSearch"
        @keyup="searchStaff"
      >
    </div>
    <div class="section-header-input">
      <label for="staff-department">Showing</label>
      <select id="staff-department" v-model="staffDepartmentsFilter" @change="searchStaff">
        <option value selected>All</option>
        <template v-for="(department, index) in staffDepartments">
          <option :value="department" :key="index+1">{{department | capitalize}}</option>
        </template>
      </select>
      <font-awesome icon="caret-up" size="xs" class="up"/>
      <font-awesome icon="caret-down" size="xs" class="down"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-staff",
  props: {
    staffDepartments: { type: Array, required: true }
  },
  data: () => ({
    staffSearch: "",
    staffDepartmentsFilter: ""
  }),
  methods: {
    searchStaff() {
      this.$emit("searchStaff", {
        staffSearch: this.staffSearch,
        staffDepartmentsFilter: this.staffDepartmentsFilter
      });
    }
  }
};
</script>

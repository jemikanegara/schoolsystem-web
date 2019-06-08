<template>
  <div class="section-body desktop">
    <template v-if="staffSearch !== ''  && filteredStaffs.length < 1">
      <div class="not-found">Data Not Found</div>
    </template>
    <template v-else>
      <table>
        <thead>
          <td>Name</td>
          <td>Department</td>
          <td>Employee Number</td>
        </thead>
        <tbody>
          <template v-for="staff in filteredStaffs.length > 0 ? filteredStaffs : staffs">
            <tr :key="staff.empNo">
              <td>{{staff.empName | capitalize}}</td>
              <td>{{staff.empDepartment | capitalize}}</td>
              <td>{{staff.empNo}}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  name: "view-staff-desktop",
  props: {
    staffSearch: String,
    filteredStaffs: Array,
    staffs: Array
  }
};
</script>


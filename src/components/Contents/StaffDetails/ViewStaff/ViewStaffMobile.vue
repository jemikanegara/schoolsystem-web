<template>
  <div id="mobile-view">
    <template v-if="staffSearch !== '' && filteredStaffs.length < 1">
      <div class="not-found">Data Not Found</div>
    </template>
    <template v-else>
      <template v-for="staff in filteredStaffs.length > 0 ? filteredStaffs : staffs">
        <table :key="staff.empNo">
          <tr>
            <td>Name</td>
            <td class="staff-element">{{staff.empName | capitalize}}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td class="staff-element">{{staff.empDepartment | capitalize}}</td>
          </tr>
          <tr>
            <td>Employee Number</td>
            <td class="staff-element">{{staff.empNo}}</td>
          </tr>
        </table>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "view-staff-mobile",
  props: {
    staffSearch: String,
    filteredStaffs: Array,
    staffs: Array
  }
};
</script>

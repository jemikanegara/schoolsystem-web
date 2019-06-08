<template>
  <div id="view-staff">
    <FilterStaff :staffDepartments="staffDepartments" @searchStaff="searchStaff"/>
    <!-- Mobile View -->
    <template v-if="isMobile">
      <ViewStaffMobile
        :staffSearch="staffSearch"
        :filteredStaffs="filteredStaffs"
        :staffs="staffs"
      />
    </template>
    <!-- Desktop View -->
    <template v-else>
      <ViewStaffDesktop
        :staffSearch="staffSearch"
        :filteredStaffs="filteredStaffs"
        :staffs="staffs"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import capitalize from "../../../../filters/capitalize";
import FilterStaff from "./FilterStaff";
import ViewStaffDesktop from "./ViewStaffDesktop";
import ViewStaffMobile from "./ViewStaffMobile";

export default {
  name: "view-staff",
  components: {
    FilterStaff,
    ViewStaffDesktop,
    ViewStaffMobile
  },
  props: {
    isMobile: { type: Boolean, required: true },
    staffDepartments: { type: Array, required: true },
    staffs: { type: Array, required: true }
  },
  data: () => ({
    staffSearch: "",
    staffDepartmentsFilter: ""
  }),
  computed: {
    ...mapGetters("staff", ["filteredStaffs"])
  },
  watch: {
    staffs(newStaffs) {
      this.updateDepartment(newStaffs);
    }
  },
  methods: {
    ...mapActions("staff", ["filterStaff"]),
    searchStaff({ staffSearch, staffDepartmentsFilter }) {
      this.staffSearch = staffSearch;
      this.staffDepartmentsFilter = staffDepartmentsFilter;
      this.filterStaff({
        empNameOrNo: staffSearch,
        empDepartment: staffDepartmentsFilter
      });
    },
    updateDepartment(staffs) {
      this.$emit("updateDepartment", staffs);
    }
  },
  mounted() {
    this.$emit("updateRenderedPage", "staff-details");
    this.searchStaff({
      staffSearch: this.staffSearch,
      staffDepartmentsFilter: this.staffDepartmentsFilter
    });
  }
};
</script>

<style>
#view-staff {
  border: 1px solid #e5e9e6;
  box-shadow: 1px 1px 1px #e5e9e6;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ecf0f1;
  padding: 20px 15px;
}
.section-header h3 {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
}
.section-header-input label {
  text-transform: uppercase;
  padding-right: 10px;
  font-size: 14px;
}

.section-header-input input[type="text"] {
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 5px 15px;
}

.section-header-input select {
  appearance: none;
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 5px 30px 5px 10px;
}
.section-header-input .up {
  position: absolute;
  margin-left: -20px;
  margin-top: 5px;
}
.section-header-input .down {
  position: absolute;
  margin-left: -20px;
  margin-top: 15px;
}
.section-header-input #staff-department:focus ~ .up,
.section-header-input #staff-department:focus ~ .down {
  color: #39a2d9;
  font-weight: 700;
}

/* Table */
.section-body {
  padding: 25px;
}
table {
  width: 100%;
  border: 1px solid #dddddd;
  box-shadow: 1px 1px 1px #ddd;
  border-collapse: collapse;
}
thead,
tbody tr:nth-child(even) {
  background: #f8f8f8;
}
thead td {
  width: 33.33%;
  padding: 15px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 15px;
  font-weight: 500;
}

tbody td {
  padding: 10px 0;
  text-align: center;
  border: 1px solid #ddd;
}

tbody tr:hover {
  background: #ddd;
}

#mobile-view table:nth-child(even) {
  background: #f8f8f8;
}

#mobile-view table:hover {
  background: #ddd;
}

#mobile-view table td {
  padding: 5px;
}

.not-found {
  padding: 5px;
}

#staff-department option {
  text-transform: capitalize;
}

@media (max-width: 980px) {
  .section-header {
    display: block;
  }
  .section-header-input {
    padding: 5px 0;
  }
  #staff-department option {
    font-size: 12px;
  }
  .staff-element {
    text-align: right;
  }
  tr {
    border: none;
  }
}
</style>

<template>
  <div id="staff-details">
    <div class="top-section">
      <template v-if="renderedPage !== 'add-staff'">
        <h2>Staff Details</h2>
        <router-link :to="{ path: 'add'}" append>
          <button>
            <font-awesome icon="plus" size="1x"/>
            {{" "}}Add Employee
          </button>
        </router-link>
      </template>
      <template v-if="renderedPage !== 'staff-details'">
        <h2>Add Staff</h2>
        <router-link to="/staff-details">
          <button>
            <font-awesome icon="eye" size="1x"/>
            {{" "}}View Employees
          </button>
        </router-link>
      </template>
    </div>
    <router-view
      :isMobile="isMobile"
      @updateRenderedPage="updateRenderedPage"
      @updateDepartment="updateDepartment"
      :staffDepartments="staffDepartments"
      :staffs="staffs"
    ></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "staff-details",
  computed: {
    ...mapGetters(["isMobile"]),
    ...mapGetters("staff", ["staffs"])
  },
  data: () => ({
    renderedPage: "add-staff",
    staffDepartments: []
  }),
  watch: {
    staffs() {
      this.updateDepartment(this.staffs);
    }
  },
  methods: {
    updateRenderedPage(value) {
      this.renderedPage = value;
    },
    updateDepartment(staffs) {
      const departmentLists = staffs.map(staff => staff.empDepartment);
      const departments = new Set(departmentLists);
      this.staffDepartments = [...departments];
    }
  },
  mounted() {
    this.updateDepartment(this.staffs);
  }
};
</script>

<style>
#staff-details {
  color: #000;
}

#staff-details .top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
}

.top-section h2 {
  text-transform: uppercase;
}

.top-section button {
  background: #1f3269;
  border: none;
  border-radius: 32px;
  padding: 5px 20px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
}

.top-section button:hover {
  background: #355586;
}

@media (max-width: 980px) {
  .top-section h2 {
    font-size: 22px;
  }
  .top-section button {
    padding: 5px 15px;
  }
}
</style>

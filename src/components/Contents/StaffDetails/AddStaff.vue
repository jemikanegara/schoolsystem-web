<template>
  <div id="add-staff">
    <h3>New Staff Details</h3>
    <div class="add-staff-form">
      <label for="add-staff-name">Name</label>
      <br>
      <input
        type="text"
        name="add-staff-name"
        id="add-staff-name"
        placeholder="Staff name"
        v-model="newStaff.empName"
      >
      <template v-if="error.empName">
        <span class="error-message">{{ error.empName }}</span>
      </template>
      <br>
      <label for="add-staff-department">Select Department</label>
      <br>
      <select
        v-model="newStaff.empDepartment"
        :disabled="isNewDepartment"
        :class="{disabled:isNewDepartment}"
      >
        <option selected value>Select</option>
        <template v-for="(department, index) in staffDepartments">
          <option :value="department" :key="index">{{department | capitalize}}</option>
        </template>
      </select>
      <template v-if="error.empDepartment">
        <span class="error-message">{{ error.empDepartment }}</span>
      </template>
      <br>
      <input
        type="checkbox"
        id="new-department"
        @click="toggleNewDepartment "
        v-model="isNewDepartment"
      >
      <label for="new-department">Or add new department</label>
      <br>
      <template v-if="isNewDepartment">
        <input
          type="text"
          name="add-staff-department"
          id="add-staff-department"
          placeholder="New department"
          v-model="newStaff.empNewDepartment"
        >
        <template v-if="error.empNewDepartment">
          <span class="error-message">{{ error.empNewDepartment }}</span>
        </template>
        <br>
      </template>
      <button
        class="add-staff-submit"
        @click="submitNewStaff"
        :disabled="dataSubmitted"
        :class="{disabled: dataSubmitted}"
      >Submit</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import capitalize from "../../../filters/capitalize";
import { setTimeout } from "timers";

export default {
  name: "add-staff",
  data: () => ({
    newStaff: {
      empName: "",
      empDepartment: "",
      empNewDepartment: "",
      empNo: 0
    },
    error: {
      empName: null,
      empDepartment: null,
      empNewDepartment: null
    },
    isNewDepartment: false,
    dataSubmitted: false
  }),
  props: {
    staffDepartments: { type: Array, required: true },
    staffs: { type: Array, required: true }
  },
  watch: {
    staffs(newStaffs) {
      this.updatedEmpNo(newStaffs);
    }
  },
  methods: {
    ...mapActions("staff", ["addStaff"]),
    toggleNewDepartment() {
      this.newDepartment = !this.newDepartment;
      this.newStaff.empDepartment = "";
      this.error.empDepartment = null;
      this.error.empNewDepartment = null;
    },
    submitNewStaff() {
      this.dataSubmitted = true;
      // Remove errors
      this.error = {
        empName: null,
        empDepartment: null,
        empNewDepartment: null
      };
      // Name check
      if (this.newStaff.empName.length < 1) {
        this.error.empName = `Name cannot be empty`;
      }
      // Department check
      if (!this.isNewDepartment) {
        if (this.newStaff.empDepartment.length < 1) {
          this.error.empDepartment = `Please choose a department`;
        }
      } else {
        if (this.newStaff.empNewDepartment.length < 1) {
          this.error.empNewDepartment = `New department cannot be empty`;
        } else if (this.newStaff.empNewDepartment.length < 6) {
          this.error.empNewDepartment = `New department length minimum 6 characters`;
        }
      }
      // Return if there is an error
      if (
        this.error.empName ||
        this.error.empDepartment ||
        this.error.empNewDepartment
      ) {
        this.dataSubmitted = false;
        return;
      }

      let { empName, empDepartment, empNewDepartment, empNo } = this.newStaff;
      const payload = this.isNewDepartment
        ? { empName, empDepartment: empNewDepartment, empNo }
        : { empName, empDepartment, empNo };
      this.addStaff(payload);
      setTimeout(() => {
        this.$router.push("/staff-details");
      }, 3000);
    },
    updatedEmpNo(newStaffs) {
      this.newStaff.empNo = `12300${newStaffs.length}`;
    }
  },
  mounted() {
    this.$emit("updateRenderedPage", "add-staff");
    this.updatedEmpNo(this.staffs);
  }
};
</script>

<style>
#add-staff h3 {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
  padding-bottom: 10px;
}
#add-staff input,
#add-staff select {
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 10px 0;
}

#add-staff select {
  padding-left: 5px;
  min-width: 200px;
}

#add-staff input[type="checkbox"] {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}

.add-staff-submit {
  background: #39a2d9;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
.add-staff-submit:hover {
  background: #1f3269;
}
#add-staff .disabled {
  background: #eee !important;
}

#add-staff button.disabled {
  color: #666;
}

#add-staff .error-message {
  padding: 5px 10px;
  margin-left: 5px;
  background: rgb(231, 19, 19);
  color: #fff;
}

@media (max-width: 980px) {
  #add-staff option {
    font-size: 12px;
  }
  #add-staff .error-message {
    display: inline-block;
    margin-bottom: 10px;
    margin-top: -10px;
    margin-left: 0px;
  }
}
</style>

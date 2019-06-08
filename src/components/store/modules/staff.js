const state = {
    filteredStaffs: [],
    staffs: [
        {
            empNo: "100001",
            empName: "Jim",
            empDepartment: "Primary"
        },
        {
            empNo: "100005",
            empName: "Susi",
            empDepartment: "Preschool"
        },
        {
            empNo: "111002",
            empName: "Bambang",
            empDepartment: "Primary"
        },
        {
            empNo: "100002",
            empName: "Andi",
            empDepartment: "Preschool"
        }
    ]
}

const getters = {
    staffs: state => {
        return state.staffs
    },
    filteredStaffs: state => {
        return state.filteredStaffs
    }
}

const mutations = {
    addStaff: (state, payload) => {
        state.staffs.push(payload)
    },
    filterStaff: (state, { empNameOrNo, empDepartment }) => {
        if (empNameOrNo === "" && empDepartment === "") {
            state.filteredStaffs = []
            return
        }
        else {
            const filteredStaffs = state.staffs.filter(
                staff =>
                    (
                        staff.empNo.toLowerCase().includes(empNameOrNo)
                        ||
                        staff.empName.toLowerCase().includes(empNameOrNo)
                    )
                    &&
                    staff.empDepartment.toLowerCase().includes(empDepartment)
            )
            state.filteredStaffs = filteredStaffs
        }
    }
}

const actions = {
    addStaff: ({ commit }, payload) => {
        commit('addStaff', payload)
    },
    filterStaff: ({ commit }, { empNameOrNo, empDepartment }) => {
        commit('filterStaff', { empNameOrNo: empNameOrNo ? empNameOrNo.toLowerCase() : empNameOrNo, empDepartment: empDepartment ? empDepartment.toLowerCase() : empDepartment })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
};
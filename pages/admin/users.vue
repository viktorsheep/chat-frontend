<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="12" :offset="0">
        <b>TOTAL USERS :</b> {{ users.length }}
      </el-col>
      <el-col :span="12" :offset="0" />
    </el-row>

    <el-table
      :data="users"
      style="width: 100%;"
    >
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />

      <el-table-column
        prop="email"
        label="Email Address"
      />

      <el-table-column
        prop="created_at"
        label="Joined At"
        width="180"
      />
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'app',

  fetch () {
    this.getUsers()
  },

  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },

  methods: {
    ...mapActions({
      getUsers: 'users/users'
    })
  }
}
</script>

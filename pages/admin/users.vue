<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="12" :offset="0">
        <b>TOTAL USERS :</b> {{ users.length }}
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="data.search.term"
          placeholder="Search user"
          size="small"
          clearable
          @change="handle().user().search()"
        />
      </el-col>
      <el-col :span="6" :offset="0" style="text-align: right;">
        <el-button type="primary" size="small" plain @click="visibility.drawer = true">
          Add User
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="users"
          style="width: 100%;"
        >
          <el-table-column
            label="Name"
            width="180"
          >
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>

          <el-table-column
            prop="email"
            label="Email Address"
          />

          <el-table-column
            label="Status"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.is_active ? 'Active' : 'Inactive' }} -->
              <i
                :class="scope.row.is_active ? 'el-icon-success' : 'el-icon-remove'"
                :style="`color: #${scope.row.is_active ? '67C23A' : '909399'}`"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="created_at"
            label="Joined At"
            width="180"
          />

          <el-table-column
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-tooltip
                effect="dark"
                content="User's associated pages"
                placement="top"
                :open-delay="500"
              >
                <el-button
                  type="primary"
                  icon="el-icon-document"
                  circle
                  @click="handle().user().view(scope.row.id)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-drawer
          :with-header="false"
          :visible.sync="visibility.drawer"
          @closed="handle().drawer().closed()"
        >
          <el-row :gutter="0">
            <el-col :span="24" :offset="0" style="padding: 0 20px; height: calc(100vh - 70px);">
              <h3>Add User</h3>

              <el-form label-position="top" label-width="100px" :model="data.user">
                <!-- Type -->
                <!--
                <el-form-item>
                  <el-select v-model="data.user.user_role_id" placeholder="Select User Role">
                    <el-option
                      v-for="r in roles"
                      :key="r.id"
                      :label="r.name"
                      :value="r.id"
                    />
                  </el-select>
                </el-form-item>
                -->

                <!-- Name -->
                <el-form-item>
                  <el-input v-model="data.user.name" placeholder="Name" />
                </el-form-item>

                <!-- Email -->
                <el-form-item>
                  <el-input v-model="data.user.email" placeholder="Email" />
                </el-form-item>

                <!-- Password -->
                <el-form-item>
                  <el-input
                    v-model="data.user.password"
                    placeholder="User Password"
                    size="normal"
                    show-password
                  />
                </el-form-item>

                <!-- Status -->
                <el-form-item>
                  <el-switch
                    v-model="data.user.is_active"
                    :active-text="data.text.is_active"
                    inactive-color="red"
                    @change="handle().isActiveChanged()"
                  />
                </el-form-item>

                <el-divider direction="horizontal" content-position="center">
                  Pages
                </el-divider>

                <el-alert
                  title="Select the pages to add the user as a member of the page(s)."
                  show-icon
                  type="info"
                  style="margin-bottom: 20px;"
                  :closable="false"
                />

                <div style="margin-bottom: 20px;">
                  <el-switch
                    v-model="data.pages.hideInactive"
                    :active-text="data.text.hideInactive"
                  />
                </div>

                <div style="max-height: 340px; overflow: auto;">
                  <el-checkbox-group v-model="data.user.pages">
                    <div v-for="p in pages" :key="p.id" :style="`margin-bottom: 10px; ${!p.is_active && data.pages.hideInactive ? 'display: none;' : ''}`">
                      <el-checkbox
                        :label="p.id"
                        :value="p.id"
                        border
                        style="width: 100%;"
                        :disabled="p.is_active ? false : true"
                      >
                        {{ p.name }}
                      </el-checkbox>
                    </div>
                  <!-- <el-checkbox label="selected and disabled" disabled /> -->
                  </el-checkbox-group>
                </div>
              </el-form>
            </el-col>
          </el-row>

          <div style="height: 50px; line-height: 50px; text-align: right; padding: 0 10px;">
            <el-button type="default" size="small" @click="visibility.drawer = false">
              Cancel
            </el-button>

            <el-button type="primary" size="small" @click="handle().addUser()">
              Add
            </el-button>
          </div>
        </el-drawer>
      </el-col>
    </el-row>

    <!-- User Page Dialog -->
    <el-dialog
      title="User's Associated Pages"
      :visible.sync="visibility.dialog.userPages"
      width="50%"
    >
      <!-- :before-close="handle().close().dialog()" -->
      <div v-loading="loading.userPages">
        <div
          v-for="up in data.userPages"
          :key="up.id"
          class="list-userpages"
        >
          <div class="pagename">
            {{ helper().getPageName(up.page_id).name }}
            <i :class="`el-icon-${up.is_joined ? 'success' : 'remove'}`" :style="`color: #${up.is_joined ? '67C23A' : '909399'};`" />
          </div>

          <div v-if="up.is_joined">
            <b>Joined at </b>{{ up.joined_date }}
          </div>
          <div v-else>
            <b>Left at </b>{{ up.left_date }}
          </div>

          <div class="control">
            <el-button type="danger" size="small" icon="el-icon-error" @click="handle().user().deletePage()" />
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visibility.dialog.userPages = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'app',

  data () {
    return {
      visibility: {
        drawer: false,
        dialog: {
          userPages: false
        }
      },

      loading: {
        userPages: false
      },

      data: {
        user: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          is_active: false,
          is_confirmed: true,
          user_role_id: 3,
          pages: []
        },

        userPages: [],

        pages: {
          selected: [],
          hideInactive: false
        },

        search: {
          term: ''
        },

        text: {
          is_active: 'Inactive',
          hideInactive: 'Hide Inactive Pages'
        }
      }
    }
  },

  fetch () {
    this.getUsers()
    this.getRoles()
    this.getPages({ with_token: true })
  },

  computed: {
    ...mapGetters({
      users: 'users/users',
      roles: 'users/roles',
      pages: 'pages/pages'
    })
  },

  watch: {
    data: {
      handler (n, o) {
        n.pages.hideInactive === true
          ? n.text.hideInactive = 'Show Inactive Pages'
          : n.text.hideInactive = 'Hide Inactive Pages'
      },
      deep: true
    }
  },

  methods: {
    ...mapActions({
      getUsers: 'users/users',
      getRoles: 'users/roles',
      getPages: 'pages/browse',
      addUser: 'users/add'
    }),

    // All Handle Methods
    handle () {
      const self = this

      return {
        user () {
          // const user = this

          return {
            add () {
              self.data.user.password_confirmation = self.data.user.password

              if (self.data.user.pages.length === 0) { delete self.data.user.pages }
              self.addUser(self.data.user)
            },

            search () {

            },

            view (id) {
              console.log(id)
              self.visibility.dialog.userPages = true
              self.api().getUserPages(id)
            }
          }
        },

        addUser () {
          self.data.user.password_confirmation = self.data.user.password

          if (self.data.user.pages.length === 0) { delete self.data.user.pages }
          self.addUser(self.data.user)
        },

        isActiveChanged (x) {
          console.log(self.data.user.is_active)
          self.data.user.is_active
            ? self.data.text.is_active = 'Active'
            : self.data.text.is_active = 'Inactive'
        },

        drawer () {
          // const drawer = this

          return {
            closed () {
              console.log('closed')
            }
          }
        },

        close () {
          const self = this
          return {
            dialog () {
              self.visibility.dialog.userPages = false
            }
          }
        }
      }
    }, // e.o handle()

    api () {
      const self = this

      return {

        async getUserPages (id) {
          self.loading.userPages = true
          const payload = {
            method: 'get',
            url: 'user/page/get/' + id
          }

          await self.$sender(payload).then((res) => {
            self.loading.userPages = false
            console.log(res.content.data)
            self.data.userPages = res.content.data
          })
        }
      }
    },

    helper () {
      const self = this
      return {
        getPageName (id) {
          const x = self.pages.find(p => p.id === 1)
          console.log(typeof (x))
          return x
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.list-userpages {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  height: 60px;
  position: relative;
  transition: all 300ms ease-in-out;

  .pagename {
    font-weight: bolder;
    margin-bottom: 20px;
  }

  .control {
    position: absolute;
    right: 0;
    top: 25px;
    text-align: center;
    width: 100px;
    height: 30px;
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  &:hover {
    background: #eee;

    .control {
      opacity: 1;
    }
  }
}
</style>

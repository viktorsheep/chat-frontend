<template>
  <div>
    <!-- Control Bar -->
    <el-row>
      <el-col
        :span="24"
        style="text-align: right;"
      >
        <el-button
          type="primary"
          plain
          size="small"
          @click="handle().drawer.open()"
        >
          Add Page
        </el-button>
      </el-col>
    </el-row> <!-- e.o Control Bar -->

    <el-row style="margin-top: 20px;">
      <el-col>
        <el-table
          :data="pages"
          style="width: 100%"
        >
          <!-- Page Name -->
          <el-table-column
            prop="name"
            label="Name"
            width="180"
          />

          <!-- Contact Person -->
          <el-table-column
            prop="contact_person"
            label="Contact Person"
          />

          <!-- Page ID -->
          <el-table-column
            prop="page_id"
            label="Page ID"
            width="100"
          />

          <!-- URL -->
          <el-table-column
            prop="url"
            label="URL"
          />

          <!-- Access Token -->
          <el-table-column
            label="Access Token"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <div class="wrap-at">
                <span>
                  ***********
                </span>

                <div class="control">
                  <el-button type="primary" size="mini" @click="handle().dialog.open(scope.row)">
                    Get Token
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>

          <!-- Active Status -->
          <el-table-column
            prop="is_active"
            label="Status"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <i
                :class="scope.row.is_active ? 'el-icon-success' : 'el-icon-remove'"
                :style="`color: #${scope.row.is_active ? '67C23A' : '909399'}`"
              />
            </template>
          </el-table-column>

          <!-- Actions -->
          <el-table-column
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                circle
                plain
                @click="handle().page.edit(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- Drawer -->
    <el-drawer
      :with-header="false"
      :visible.sync="state.visibility.drawer"
      @closed="handle().drawer.closed()"
    >
      <div style="padding: 0 20px;">
        <div style="height: calc(100vh - 70px)">
          <h3>Add Page</h3>
          <FormAdminPages
            :edit-data="data.form.edit"
            :edit-mode="state.mode.edit"
            :reset="conf.form.page.reset"
            @formChanged="handle().event.formChanged(...arguments)"
            @formReset="conf.form.page.reset = false"
          />
        </div>

        <div style="height: 50px; line-height: 50px; text-align: right;">
          <el-button type="default" size="small" @click="state.visibility.drawer = false">
            Cancel
          </el-button>

          <el-button
            :type="state.mode.edit ? 'warning' : 'primary'"
            size="small"
            :disabled="state.disabled.btn.addPage"
            @click="handle().page.save()"
          >
            {{ state.mode.edit ? 'Edit' : 'Add' }}
          </el-button>
        </div>
      </div>
    </el-drawer> <!-- e.o Drawer -->

    <!-- AT Dialog -->
    <el-dialog
      title="Access Token"
      :visible.sync="state.visibility.dialog.accessToken"
      width="70%"
    >
      <div>
        <el-input
          v-model="data.current.accessToken"
          placeholder="Access Token"
          :disabled="state.visibility.dialog.at.edit ? false : true"
          size="normal"
          clearable
        >
          <el-button v-if="!state.visibility.dialog.at.edit" slot="append" icon="el-icon-document-copy" type="primary" />
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="warning"
          size="mini"
          @click="handle().dialog.button.click.update()"
        >
          <!-- @click="handle().d.open('hi')" -->
          <!-- @click="state.visibility.dialog.at.edit = true" -->
          Update {{ state.visibility.dialog.at.edit ? "" : "Token" }}
        </el-button>

        <el-button
          size="mini"
          @click="state.visibility.dialog.at.edit ? handle().dialog.button.click.cancel() : handle().dialog.button.click.close()"
        >
          {{ state.visibility.dialog.at.edit ? "Cancel" : "Close" }}
        </el-button>
      </span>
    </el-dialog> <!-- e.o AT Dialog -->
  </div>
</template>

<script>
import * as R from 'ramda'
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'app',
  middleware: 'auth',

  data () {
    return {
      conf: {
        form: {
          page: {
            reset: false
          }
        }
      },

      data: {
        current: {
          accessToken: '',
          atID: 0,
          atTemp: ''
        },

        form: {
          edit: {
            id: '',
            name: '',
            page_id: '',
            url: '',
            contact_person: '',
            is_active: false
          },

          page: {
            name: '',
            page_id: '',
            url: '',
            contact_person: '',
            is_active: false
          }
        }
      },

      state: {
        mode: {
          edit: false
        },

        disabled: {
          btn: {
            addPage: true
          }
        },

        visibility: {
          drawer: false,
          dialog: {
            accessToken: false,
            at: {
              edit: false
            }
          }
        },

        loading: {
          dialog: {
            at: false
          }
        }
      }

    }
  },

  fetch () {
    this.browsePages()
  },

  computed: {
    ...mapGetters({
      pages: 'pages/pages'
    })
  },

  watch: {
    'state.visibility.dialog.at.edit': {
      handler (n, o) {
        // NOTE : v.
        // restoring previous value if the value changed
        // but cancelled the update

        if (n) {
          this.data.current.atTemp = this.data.current.accessToken
        } else if (!n && this.data.current.atTemp !== this.data.current.accessToken) {
          this.data.current.accessToken = this.data.current.atTemp
          this.data.current.atTemp = ''
        }
      }
    },

    'data.form.page': {
      handler (n, o) {
        const nv = R.clone(n)
        delete nv.is_active

        const notEmpty = Object.values(nv).every(v => v !== '')
        this.state.disabled.btn.addPage = !notEmpty
      },
      deep: true
    }
  },

  methods: {

    ...mapActions({
      browsePages: 'pages/browse',
      addPage: 'pages/add',
      editPage: 'pages/edit'
    }),

    // Handlers
    handle () {
      const self = this

      return {
        // drawer methods
        drawer: {
          open (p) {
            self.state.visibility.drawer === true
              ? self.state.visibility.drawer = false
              : self.state.visibility.drawer = true
          },

          closed () {
            self.state.mode.edit = false
            self.conf.form.page.reset = true
          }
        }, // e.o drawer methods

        // dialog methods
        dialog: {
          close () {

          },

          open (row) {
            self.state.visibility.dialog.accessToken = true
            self.api().at.get(row.id)
          },

          button: {
            click: {
              close () {
                self.state.visibility.dialog.accessToken = false
              },

              cancel () {
                self.state.visibility.dialog.at.edit = false
              },

              update () {
                self.state.visibility.dialog.at.edit
                  ? self.api().at.update()
                  : self.state.visibility.dialog.at.edit = true
              }
            }
          }
        }, // e.o dialog methods

        // page methods
        page: {
          save () {
            self.state.mode.edit
              ? self.editPage(self.data.form.page)
              : self.addPage(self.data.form.page)

            self.state.visibility.drawer = false
          },

          edit (row) {
            self.data.form.edit = R.clone(row)
            self.state.mode.edit = true
            self.handle().drawer.open()
          }
        }, // e.o page methods

        // emit events handlers
        event: {
          formChanged (form) {
            self.data.form.page = R.clone(form)
          }
        } // e.o emit events handlers
      }
    },

    // API callers
    api () {
      const self = this

      return {
        at: {
          async get (pageID) {
            self.state.loading.dialog.at = true
            await self.$sender({
              method: 'get',
              url: `page/${pageID}/access_token/get`
            }).then((res) => {
              self.data.current.atID = pageID
              self.state.loading.dialog.at = false
              self.data.current.accessToken = res.content.data.access_token
            })
          },

          async update () {
            self.state.loading.dialog.at = true
            await self.$sender({
              method: 'put',
              url: `page/${self.data.current.atID}/access_token/update`,
              data: {
                access_token: self.data.current.accessToken
              },
              message: {
                success: 'Access token is updated.'
              }
            }).then((res) => {
              console.log(res)
              self.state.visibility.dialog.at.edit = false
              self.state.loading.dialog.at = false
            })
          }
        }
      }
    },

    // Helpers
    helper () {

    }

  }
}
</script>

<style lang="scss" scoped>
.wrap {
  &-at {

    height: 40px;
    position: relative;
    text-align: center;

    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }

    .control {
      position: absolute;
      top: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      opacity: 0;
      transition: all 200ms ease-in-out;
    }

    &:hover {
      .control {
        opacity: 1;
      }
    }
  }
}
</style>

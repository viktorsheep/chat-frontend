<template>
  <div>
    <el-row>
      <el-col
        :span="24"
        style="text-align: right;"
      >
        <el-button
          type="primary"
          plain
          size="small"
          @click="handleOpenDrawer"
        >
          Add Page
        </el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col>
        <el-table
          :data="pages"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="Name"
            width="180"
          />

          <el-table-column
            prop="contact_person"
            label="Contact Person"
          />

          <el-table-column
            prop="page_id"
            label="Page ID"
            width="100"
          />

          <el-table-column
            prop="url"
            label="URL"
          />

          <el-table-column
            label="Access Token"
          >
            <template>
              ***********
            </template>
          </el-table-column>

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
                @click="handleEdit(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-drawer
      :with-header="false"
      :visible.sync="visibility.drawer"
      @closed="handleDrawerClosed"
    >
      <div style="padding: 0 20px;">
        <div style="height: calc(100vh - 70px)">
          <h3>Add Page</h3>
          <FormAdminPages
            :edit-data="editForm"
            :edit-mode="editMode"
            :reset="conf.form.page.reset"
            @formChanged="handleFormChanged"
            @formReset="conf.form.page.reset = false"
          />
        </div>

        <div style="height: 50px; line-height: 50px; text-align: right;">
          <el-button type="default" size="small" @click="visibility.drawer = false">
            Cancel
          </el-button>

          <el-button
            :type="editMode ? 'warning' : 'primary'"
            size="small"
            :disabled="disabled.btn.addPage"
            @click="handleSavePage()"
          >
            {{ editMode ? 'Edit' : 'Add' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
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
      visibility: {
        drawer: false
      },
      disabled: {
        btn: {
          addPage: true
        }
      },
      pageForm: {
        name: '',
        page_id: '',
        url: '',
        contact_person: '',
        is_active: false
      },
      editForm: {
        id: '',
        name: '',
        page_id: '',
        url: '',
        contact_person: '',
        is_active: false
      },
      editMode: false
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
    pageForm: {
      handler (n, o) {
        const nv = R.clone(n)
        delete nv.is_active

        const notEmpty = Object.values(nv).every(v => v !== '')
        this.disabled.btn.addPage = !notEmpty
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

    handleOpenDrawer () {
      this.visibility.drawer === true
        ? this.visibility.drawer = false
        : this.visibility.drawer = true
    },

    handleSavePage () {
      console.log(this.pageForm)

      this.editMode
        ? this.editPage(this.pageForm)
        : this.addPage(this.pageForm)

      this.visibility.drawer = false

      /*
      const payload = {
        method: 'post',
        url: 'page/add',
        data: this.pageForm,
        message: {
          success: 'Facebook page added.'
        }
      }

      this.$sender(payload).then((res) => {
        console.log(res)
        if (res.success) {
          this.visibility.drawer = false
        }
      })
      */
    },

    handleFormChanged (form) {
      this.pageForm = R.clone(form)
    },

    handleDrawerClosed () {
      this.editMode = false
      this.conf.form.page.reset = true
    },

    handleEdit (row) {
      this.editForm = R.clone(row)
      this.editMode = true

      console.log(this.editForm)
      this.handleOpenDrawer()

      // this.$router.push(`/admin/pages/${r.id}/edit`)
    }
  }
}
</script>

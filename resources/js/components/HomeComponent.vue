<template>
  <v-app id="inspire">


    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >

<v-toolbar-title> <div>
    <div class="d-inline  font-weight-light  white--text">WEED</div>
    <div class="d-inline font-weight-medium  white--text">BOY</div>
  </div></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>

        <template>


    <v-dialog v-model="dialog" persistent max-width="600px">
      <template class="pa-0" v-slot:activator="{ on }">
        <v-btn v-if="!loggedIn" text v-on="on"> <v-icon >mdi-account-lock-outline</v-icon>  Register</v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline"> New User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="name" label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="middle_name" label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="last_name"
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
              <v-checkbox v-model="age" class="mx-2" label="21 Years or older"></v-checkbox>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text  @click="addClient()" >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>
         <template>


    <v-dialog v-model="login" persistent max-width="600px">
      <template class="pa-0" v-slot:activator="{ on }">
        <v-btn v-if="!loggedIn" text v-on="on"> <v-icon >mdi-account-lock-outline</v-icon>  Login </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Login </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="username" label="Username*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
              </v-col>

            </v-row>
            <v-checkbox v-model="checkbox2" label=" Remember me  "></v-checkbox>
          </v-container>


          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="login = false">Close</v-btn>
          <v-btn color="blue darken-1" text  @click="logins()" >Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>
        <v-btn  @click.prevent="logout()"  v-if="loggedIn" text><v-icon >lock</v-icon> Logout</v-btn>
      </v-toolbar-items>



    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-tooltip right>

          </v-tooltip>

        </v-row>
      </v-container>
    </v-content>


  </v-app>

</template>

<script>
  export default {
    data: () => ({

            username:'',
            password:'',

             status: '',

      dialog: false,
      login: false,

              name:'',
              last_name:'',
              middle_name:'',
              age:false,

              email:'',
              password:'',
                checkbox2: false,

    }),
    	methods: {

     addClient() {
      axios
        .post("api/register", {
          name: this.name,
          last_name: this.last_name,
          middle_name: this.middle_name,
          age: this.age,
          email: this.email,
          password: this.password,

        })
       .then(function(response){
      const status =
       (response.status);




    //   redirect logic
      if (response.status == 201) {
         window.location = "/home"
      }


})
.catch(error => {
       alert("oops Something went wrong please try again later ");
       this.dialog=false;
    });

// .catch(function (response) {
//         //handle error
//
//      this.$emit('hide');

//     });
  },
  logins() {
this.$store.dispatch('retrieveToken',{
     username:this.username,
      password:this.password

})
.then(response=>{
    this.$router.push('/')
})

  },
  logout(){
   this.$store.dispatch('destroyToken')
    .then(response=>{
            // location.reload()
    })}
},
computed: {
   loggedIn(){
    return this.$store.getters.loggedIn
  },
},
created(){

}

}
</script>

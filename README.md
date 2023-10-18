# BlogWebsite

<h1>Setup</h1>
<ul>
  <li>First make virtual enviroment and install libs in requirements.txt.</li>
  <li>Then make a db using psql named <b>blogdb</b> and a user named <b>blogger</b>.</li>
  <li>Now runserver and make those api calls using POSTMAN.</li>
  <li>If want to integrate front-end with the project then install Node.js and run the frontend server from the 'frontend' folder along with django server.</li>
</ul>

<h2>
  Back-End Features:
</h2>
<ul>
  <li>Django Rest Framework</li>
  <li>JWT authentication</li>
  <li>Custom pagination</li>
</ul>

<h2>
  Front-End Features:
</h2>
<ul>
  <li>React Framework</li>
  <li>Redux Implementation</li>
  <li>Proper UI</li>
  <li>Proper session management</li>
</ul>

API calls: http://localhost:8000/<br>
<table>
    <thead>
      <tr>
        <th>API Endpoint</th>
        <th>Accessibility</th>
        <th>Permission</th>
        <th>Returns</th>
        <th>Input</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>/auth/register/</td>
        <td>Accessible by anyone</td>
        <td>GET</td>
        <td>Status Code 200</td>
        <td align="Center">Username, Email, Password, First Name, Last Name</td>
      </tr>
      <tr>
        <td>/auth/login/</td>
        <td>Accessible by anyone</td>
        <td>POST</td>
        <td>JWT token consisting of access token and refresh token</td>
        <td align="Center">Username, Password</td>
      </tr>
      <tr>
        <td>/blog/save/</td>
        <td>Only logged-in users</td>
        <td>POST</td>
        <td>Data of the blog posted and Author ID</td>
        <td align="Center">Title, Author ID, Content</td>
      </tr>
      <tr>
        <td>/login/refresh/</td>
        <td>Only logged-in users</td>
        <td>GET</td>
        <td>New JWT token</td>
        <td align="Center">-</td>
      </tr>
      <tr>
        <td>/auth/user/</td>
        <td>Only logged-in users</td>
        <td>POST</td>
        <td>User ID</td>
        <td align="Center">JWT token as header</td>
      </tr>
      <tr>
        <td>/blog/getblog/</td>
        <td>Only logged-in users</td>
        <td>GET</td>
        <td>All the blogs Posted on the server.</td>
        <td align="Center">-</td>
      </tr>
      <tr>
        <td>/blog/getuserblogs</td>
        <td>Only logged-in users</td>
        <td>GET</td>
        <td>Return only those blogs which are posted by the user.</td>
        <td align="Center">user_id</td>
      </tr>
      <tr>
        <td>/blog/delete/</td>
        <td>Only Loggin-in users</td>
        <td>DELETE</td>
        <td>Deletes blogs posted by the user.</td>
        <td align="Center">blog_id</td>
      </tr>
    </tbody>
  </table>

<br>
<br>
<h1>Everything should be given in JSON format</h1>
<ul>
  <li> Register API takes 'username','first_name','last_name','email' and 'password' as input.</li>
  <li> Login API takes 'username' and 'password' as input.&nbsp;After login access token will be return which should be used as bearer authentication in postman.</li>
  <li> After adding the token /blog/save/ can be accessed which saves blog written by the user this API takes author, title and body as input.</li>
  <li> For /blog/getblog/ it returns all the blogs written by the user and to access specific blog use /blog/getblog/{blog_id}/ which can be deleted also.</li>
</ul>

<h2>Remember</h2>
<ul>
  <li>The token returned by JWT consists of user_id and password and this id is used to save blogs which should be maintained by frontend.</li>
  <li>The blog saving API uses author_id which is mapped to user_id in other words the value for user_id is equivalent to author_id.</li>
</ul>

<h1>Project Contributors:-</h1>
<li>Front-End by <a link href="https://github.com/Put-to">Put-to</a></li>
<li>Back-End by <a link href="https://github.com/LOOSINbl1tz">LOOSINbl1tz</a></li>

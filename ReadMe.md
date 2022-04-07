<h1>Warris Blog APIs</h1>
<p>Warris Blog APIs is an API created for helping frontend developers create a fully automated modern day blog with support of lots of features which include: </p>
<ul>
    <li>Article Posting</li>
    <li>Article Editing</li>
    <li>Article Commenting</li>
    <li>Article Category splitting
        <p>Here, I have provided a category function which has four parameters: <strong>Entertainment</strong>, <strong>Education</strong>  <strong>Sports</strong> and <strong>Technology</strong></p>
        <p>More explanation on how to use this feature will be written below this section.</p>
     </li>
     <br>
     <li>Article like, view and unlike</li>
     <li>Authors and editors can get his or her profile as well as set them and edit too</li>
     <li>Authors and editors can view messages sent by an admin</li>
     <li>Authors can request to be made editors or admin and Editors can make Author and Admin requests too</li>
     <li>An author or admin can delete his or her account</li>
     <li>Authors can view the progress of their articles by being able to 
         <ul>
             <li>View most liked articles with likes</li>
             <li>View most viewed article with total views</li>
             <li>View article with most comments</li>
             <li>Receive review or rating from an admin</li>
         </ul>
     </li>
     <br>
     <li>Admin features: 
         <ul>
             <li>Admin can send message to authors and editors</li>
             <li>Admin can get all users, authors and editors information</li>
             <li>Admin can get all request from users <strong>More explanation on this will be given after the next section</strong> </li>
             <li>Admin can get total number of editors, authors and articles</li>
             <li>Admin can have view the author with most articles, author with most likes on all articles collectively, author with most viwes and can also rate articles </li>
             <li>Admin can create and editor or and author but only if he or she is already registered as a user.</li>
             <li>Admin can accept editor/admin requests from authors.</li>
             <li>Admin can suspend an author or editors account.</li>
         </ul>
     </li>
     <br>
     <li>Drafts can be added, deleted and as well retrieved</li>
     <li>Authentication in this version <strong>0.0.1 Beta</strong> yet supports only registration and signing in of users.</li>
</ul>
<br> <br>
<hr>
<h2>Using the category function which is a required parameter in the articles schema</h2>
<p>The category function as mentioned earlier takes in four parameters in this version <strong>0.0.1 Beta</strong> which can be optional but make sure the category parameter is used. An example: 

    <img src="" alt="" width="200px" height="150px">
    Im the above image, you can make use of the four category's to split your articles better or less but a category must be passed in on submition else the server would through a <strong>400 error code.</strong>
</p>
<br>
<hr>
<h2>APIs End points</h2>
<p>
    The Api points to <strong>http://localhost:8082/api</strong>
    all endpoints that will be listed come after the above. An example:
    <p>Getting all articles , the end point is <small>"/articles/"</small></p>
    the API url to get the articles would be <strong>http://localhost:8082/api/articles/</strong>
</p>
<strong>API end points for article routes:</strong>
<p><strong> after "http://localhost:8082/api"</strong></p>
<hr>
<strong>GET requests</strong>
<ol>
    <li>/articles/
        <ul>
            <li>For getting all articles</li>
        </ul>
    </li>
    <li>/articles/:id
        <ul>
            <li>For getting a specific article, the <strong>id</strong>param is the article id passed from the client side. </li>
        </ul>
    </li>
    <li>/articles/sport
        <ul>
            <li>For getting all articles with category of sport only.</li>
        </ul>
    </li>
    <li>/articles/tech
        <ul>
            <li>For getting all articles with category of tech.</li>
        </ul>
    </li>
    <li>/articles/entertainment
        <ul>
            <li>For getting all articles with category of entertainment.</li>
        </ul>
    </li>
    <li>/articles/education
        <ul>
            <li>For getting all articles with category of education.</li>
            
        </ul>
    </li>
    <li>/articles/like/:id
        <ul><li>
            For getting likes of an article ,<strong>id</strong> param is sent from the client side.
        </li></ul>
    </li>
    <li>/articles/views/:id
        <ul><li>
            For getting views of an article ,<strong>id</strong> param is sent from the client side.
        </li></ul>
    </li>
    <li>/articles/latest/articles
        <ul><li>
            For getting the three most recent articles.
        </li></ul>
    </li>    
    <li>/articles/latest/views
        <ul>
            <li>For getting three most viewed articles</li>
        </ul>
    </li>    
    <li>/articles/latest/likes</li>    
    <li>/articles/sort/:category</li>
    <li>/articles/review/:id</li>
    <li>/articles/latest/article/:id</li>    
    <li>/articles/all/article/:id</li>
    <li>/articles/all/view/:id</li>
    <li>/articles/all/like/:id</li>
    <li>/articles/likes/:id</li>
    <li>/articles/views/:id</li>
    <li>/articles/comment/:id</li>
</ol>
<strong>POST requests</strong>
<ol>
    <li>/articles/like/:id</li>
    <li>/articles/</li>
    <li>/articles/unlike/:id</li>
    <li>
    /articles/views/:id
    </li>
    <li>/articles/comment/:id</li>
</ol>
<strong>PUT request</strong>
<ol>
    <li>/articles/:id</li>
</ol>
<strong>DELETE request</strong>
<ol>
    <li>/articles/:id</li>
</ol>

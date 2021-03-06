

class Logo extends React.Component{
  render(){
    return(
      <div>
    </div>
    )
}
}

class App extends React.Component{
  render(){
    return(
      <div>
        <Logo src=""/>
        <div className="main">
          <div className="contents">
<h1 class="center">Monkey Maps DocuSign</h1> 
          <Terms desc="Please read terms of Docusign Monkey Maps below. Signatures along with inputs and versions of the maps are linked to the final map and stored as part of the larger DocuSign metadata. All the feedback, drawings, and notes should be documented and traced along with different versions of the maps through the Monkey Maps envelope:  "/>
            
            
            
            
            <Footer desc="To complete partnership agreement, fill in the following fields:"/>
          </div>
        </div>
        </div>
    )
  }       
        }

class Header extends React.Component{
  render(){
    return(
    <div className="head">
        <p>{this.props.name}</p>
        <p>{this.props.desc}</p>
        <p>{this.props.tag}</p>
        <input type="text" className="textbox" placeholder="Enter your institution name"/>
        <div>
        <select className="dropdown">
          <option value="Institution type">Insitution type</option>
                    <option value="Institution type">Insitution type2</option>
  </select>
          
          
          <div className="footer">
        <p>{this.props.desc}</p>
        <div>
        <input type="text" className="textbox" placeholder="Enter representative name"/>
        </div>
        <div>
         <input type="text" className="textbox" placeholder="Position"/>
        </div>
        </div>  
          </div>
        </div>
        )
  }
}

class Terms extends React.Component{
  render(){
    return(
      <div className="terms">
        <p className="terms-desc">{this.props.desc}</p>
       <div class="iframe-container">
  <iframe src="https://na3.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=9ab61c38-03ec-4268-b29f-ac6eb57c5a48&env=na3-eu1&acct=5d9fc255-3cf4-4a31-b813-43dc7af76de5" allowfullscreen></iframe>
</div> 
      </div>
    )
  }
}

class Footer extends React.Component{
  render(){
    return(
    <div className="footer">
<br>
        </br>
        <br>
        </br>
        </div>)
  }
}

ReactDOM.render(<App />, document.getElementById("root"));


var dbGlobals = {}; // Store all indexedDB related objects in a global object called "dbGlobals".
dbGlobals.db = null; // The database object will eventually be stored here.    
dbGlobals.description = "This database is used to store files locally."; // The description of the database.
dbGlobals.name = "localFileStorage"; // The name of the database.
dbGlobals.version = 1; // Must be >= 1. Be aware that a database of a given name may only have one version at a time, on the client machine.     
dbGlobals.storeName = "fileObjects"; // The name of the database's object store. Each object in the object store is a file object.
dbGlobals.message = ""; // When useful, contains one or more HTML strings to display to the user in the 'messages' DIV box.
dbGlobals.empty = true; // Indicates whether or not there's one or more records in the database object store. The object store is initially empty, so set this to true.

// ---------------------------------------------------------------------------------------------------

function requiredFeaturesSupported() {
  switch (window.location.protocol) { // To work, IndexedDB pages must be served via the http or https protocol (or, for apps in the new Windows UI, the ms-wwa or ms-wwa-web protocols).
    case "http:":
      break;
    case "https:":
      break;
    case "ms-wwa-web:": // For apps in the new Windows UI, IndexedDB works in local content loaded in the web context.
      break;
    case "ms-wwa:": // For apps in the new Windows UI, IndexedDB works in the local context.
      break;
    default:
      document.getElementById('bodyElement').innerHTML = "<h3>IndexedDB pages must be served via the http:// or https:// protocol - resolve this issue and try again.</h3>";
      return false;
  } // switch

  if (!document.getElementById('fileSelector').files) {
    document.getElementById('bodyElement').innerHTML = "<h3>File API is not fully supported - upgrade your browser to the latest version.</h3>";
    return false;
  }

  if (!window.indexedDB) {
    if (window.mozIndexedDB) {
      window.indexedDB = window.mozIndexedDB;
    } else if (window.webkitIndexedDB) {
      window.indexedDB = webkitIndexedDB;
      IDBCursor = webkitIDBCursor;
      IDBDatabaseException = webkitIDBDatabaseException;
      IDBRequest = webkitIDBRequest;
      IDBKeyRange = webkitIDBKeyRange;
      IDBTransaction = webkitIDBTransaction;
    } else {
      document.getElementById('bodyElement').innerHTML = "<h3>IndexedDB is not supported - upgrade your browser to the latest version.</h3>";
      return false;
    }
  } // if

  if (!window.indexedDB.deleteDatabase) { // Not all implementations of IndexedDB support this method, thus we test for it here.
    document.getElementById('bodyElement').innerHTML = "<h3>The required version of IndexedDB is not supported.</h3>";
    return false;
  }

  return true;
} // requiredFeaturesSupported

// ---------------------------------------------------------------------------------------------------    

if (requiredFeaturesSupported()) {
  // Add event listeners for the four database related buttons:
  document.getElementById('openButton').addEventListener('click', openDB, false);
  document.getElementById('populateButton').addEventListener('click', populateDB, false);
  document.getElementById('displayButton').addEventListener('click', displayDB, false);
  document.getElementById('deleteButton').addEventListener('click', deleteDB, false);

  // Add an event listener for the file <input> element so the user can select some files to store in the database:
  document.getElementById('fileSelector').addEventListener('change', handleFileSelection, false); // Add an onchange event listener for the <input id="fileSelector"> element.
} // if

// ---------------------------------------------------------------------------------------------------

function displayMessage(message) {
  document.getElementById('messages').innerHTML = message;
} // displayMessage

// ---------------------------------------------------------------------------------------------------

function openDB() {
  console.log("openDB()");
  displayMessage("<p>Your request has been queued.</p>"); // Normally, this will instantly blown away by the next displayMessage().

  if (!window.indexedDB.open) {
    console.log("window.indexedDB.open is null in openDB()");
    return;
  } // if

  try {
    var openRequest = window.indexedDB.open(dbGlobals.name, dbGlobals.version); // Also passing an optional version number for this database.

    openRequest.onerror = function(evt) {
      console.log("openRequest.onerror fired in openDB() - error: " + (evt.target.error ? evt.target.error : evt.target.errorCode));
    } // Some browsers may only support the errorCode property.
    openRequest.onblocked = openDB_onblocked; // Called if the database is opened via another process, or similar.
    openRequest.onupgradeneeded = openDB_onupgradeneeded; // Called if the database doesn't exist or the database version values don't match.
    openRequest.onsuccess = openDB_onsuccess; // Attempts to open an existing database (that has a correctly matching version value).        
  } catch (ex) {
    console.log("window.indexedDB.open exception in openDB() - " + ex.message);
  }
} // openDB

// ---------------------------------------------------------------------------------------------------

function openDB_onblocked(evt) {
  console.log("openDB_onupgradeneeded()");

  var message = "<p>The database is blocked - error code: " + (evt.target.error ? evt.target.error : evt.target.errorCode) + "</p>";
  message += "</p>If this page is open in other browser windows, close these windows.</p>";

  displayMessage(message);
}

// ---------------------------------------------------------------------------------------------------

function openDB_onupgradeneeded(evt) {
  console.log("openDB_onupgradeneeded()");
  displayMessage("<p>Your request has been queued.</p>"); // Normally, this will instantly be blown away be the next displayMessage().

  var db = dbGlobals.db = evt.target.result; // A successfully opened database results in a database object, which we place in our global IndexedDB variable.

  if (!db) {
    console.log("db (i.e., evt.target.result) is null in openDB_onupgradeneeded()");
    return;
  } // if

  try {
    db.createObjectStore(dbGlobals.storeName, {
      keyPath: "ID",
      autoIncrement: true
    }); // Create the object store such that each object in the store will be given an "ID" property that is auto-incremented monotonically. Thus, files of the same name can be stored in the database.
  } catch (ex) {
    console.log("Exception in openDB_onupgradeneeded() - " + ex.message);
    return;
  }

  dbGlobals.message = "<p>The database has been created.</p>"; // A means of communicating this information to the openDB_onsuccess handler.
} // openDB_onupgradeneeded

// ---------------------------------------------------------------------------------------------------

function openDB_onsuccess(evt) {
  console.log("openDB_onsuccess()");
  displayMessage("<p>Your request has been queued.</p>"); // Normally, this will be instantly blown away by the next displayMessage().

  var db = dbGlobals.db = evt.target.result; // A successfully opened database results in a database object, which we place in our global IndexedDB variable.

  if (!db) {
    console.log("db (i.e., evt.target.result) is null in openDB_onsuccess()");
    return;
  } // if

  dbGlobals.message += "<p>The database has been opened.</p>";
  displayMessage(dbGlobals.message);
  dbGlobals.message = ""; // The message has been delivered to the user, "zero" it out just to be safe.
} // openDBsuccess

// ---------------------------------------------------------------------------------------------------

function handleFileSelection(evt) {
  console.log("handleFileSelection()");

  var files = evt.target.files; // The files selected by the user (as a FileList object).
  if (!files) {
    displayMessage("<p>At least one selected file is invalid - do not select any folders.</p><p>Please reselect and try again.</p>");
    return;
  }

  var db = dbGlobals.db;
  if (!db) {
    console.log("db (i.e., dbGlobals.db) is null in handleFileSelection()");
    return;
  } // if

  try {
    var transaction = db.transaction(dbGlobals.storeName, (IDBTransaction.READ_WRITE ? IDBTransaction.READ_WRITE : 'readwrite')); // This is either successful or it throws an exception. Note that the ternary operator is for browsers that only support the READ_WRITE value.
  } // try
  catch (ex) {
    console.log("db.transaction exception in handleFileSelection() - " + ex.message);
    return;
  } // catch

  transaction.onerror = function(evt) {
    console.log("transaction.onerror fired in handleFileSelection() - error code: " + (evt.target.error ? evt.target.error : evt.target.errorCode));
  }
  transaction.onabort = function() {
    console.log("transaction.onabort fired in handleFileSelection()");
  }
  transaction.oncomplete = function() {
    console.log("transaction.oncomplete fired in handleFileSelection()");
  }

  try {
    var objectStore = transaction.objectStore(dbGlobals.storeName); // Note that multiple put()'s can occur per transaction.

    for (var i = 0, file; file = files[i]; i++) {
      var putRequest = objectStore.put(file); // The put() method will update an existing record, whereas the add() method won't.
      putRequest.onsuccess = function() {
        dbGlobals.empty = false;
      } // There's at least one object in the database's object store. This info (i.e., dbGlobals.empty) is used in displayDB().
      putRequest.onerror = function(evt) {
        console.log("putRequest.onerror fired in handleFileSelection() - error code: " + (evt.target.error ? evt.target.error : evt.target.errorCode));
      }
    } // for            
  } // try
  catch (ex) {
    console.log("Transaction and/or put() exception in handleFileSelection() - " + ex.message);
    return;
  } // catch

  document.getElementById('fileSelector').style.display = "none"; // An attempt has already been made to select file(s) so hide the "file picker" dialog box.
} // handleFileSelection

// ---------------------------------------------------------------------------------------------------

function populateDB() {
  console.log("populateDB()");

  if (!dbGlobals.db) {
    displayMessage("<p>The database hasn't been opened/created yet.</p>");
    console.log("db (i.e., dbGlobals.db) is null in populateDB()");
    return;
  }

  document.getElementById('fileSelector').style.display = "block"; // Now that we have a valid database, allow the user to put file(s) in it.

  var message = "<p>Using the below <strong>Browse</strong> button, select one or more files to store in the database.</p>";
  message += "<p>Then, click the <strong>Display DB</strong> button to display what's currently in the database.</p>";
  displayMessage(message);
} // populateDB

// ---------------------------------------------------------------------------------------------------

function displayDB() {
  console.log("displayDB()");

  var db = dbGlobals.db;

  if (!db) {
    displayMessage("<p>There's no database to display.</p>");
    console.log("db (i.e., dbGlobals.db) is null in displayDB()");
    return;
  } // if

  try {
    var transaction = db.transaction(dbGlobals.storeName, (IDBTransaction.READ_ONLY ? IDBTransaction.READ_ONLY : 'readonly')); // This is either successful or it throws an exception. Note that the ternary operator is for browsers that only support the READ_ONLY value.
  } // try
  catch (ex) {
    console.log("db.transaction() exception in displayDB() - " + ex.message);
    return;
  } // catch

  try {
    var objectStore = transaction.objectStore(dbGlobals.storeName);

    try {
      var cursorRequest = objectStore.openCursor();

      cursorRequest.onerror = function(evt) {
        console.log("cursorRequest.onerror fired in displayDB() - error code: " + (evt.target.error ? evt.target.error : evt.target.errorCode));
      }

      var fileListHTML = "<p><strong>File(s) in database:</strong></p><ul style='margin: -0.5em 0 1em -1em;'>"; // Be aware that if the database is empty, this variable never gets used.

      cursorRequest.onsuccess = function(evt) {
        console.log("cursorRequest.onsuccess fired in displayDB()");

        var cursor = evt.target.result; // Get an object from the object store.

        if (cursor) {
          dbGlobals.empty = false; // If we're here, there's at least one object in the database's object store (i.e., the database is not empty).
          fileListHTML += "<li>" + cursor.value.name;
          fileListHTML += "<p style='margin: 0 0 0 0.75em;'>" + cursor.value.lastModifiedDate + "</p>";
          fileListHTML += "<p style='margin: 0 0 0 0.75em;'>" + cursor.value.size + " bytes</p>";
          cursor.continue(); // Move to the next object (that is, file) in the object store.
        } else {
          fileListHTML += "</ul>";
          displayMessage(fileListHTML);
        }

        if (dbGlobals.empty) {
          displayMessage("<p>The database is empty &amp;ndash; there's nothing to display.</p>");
        }
      } // cursorRequest.onsuccess
    } // inner try
    catch (innerException) {
      console.log("Inner try exception in displayDB() - " + innerException.message);
    } // inner catch
  } // outer try
  catch (outerException) {
    console.log("Outer try exception in displayDB() - " + outerException.message);
  } // outer catch
} // displayDB


function deleteDB() {
  console.log("deletedDB()");
  displayMessage("<p>Your request has been queued.</p>"); // This normally gets instantly blown away by the next displayMessage().

  try {
    if (dbGlobals.db) {
      dbGlobals.db.close(); // 
    }

    var deleteRequest = window.indexedDB.deleteDatabase(dbGlobals.name);

    deleteRequest.onerror = function(evt) {
      console.log("deleteRequest.onerror fired in deleteDB() - " + (evt.target.error ? evt.target.error : evt.target.errorCode));
    }
    deleteRequest.onsuccess = function() {
      dbGlobals.db = null;
      dbGlobals.empty = true;
      dbGlobals.message = "";
      displayMessage("<p>The database has been deleted.</p>");
    } // deleteRequest.onsuccess
  } // try
  catch (ex) {
    console.log("Exception in deleteDB() - " + ex.message);
  } // catch 
} // deleteDB


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();

    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select a Map for Preview         
          
          </div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          
          

        </form>
        <div id="white-bg" className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));


function drawGraph() {
            var graphtrace = {
                x: [document.getElementById('x-1').value,document.getElementById('x-2').value,document.getElementById('x-3').value,document.getElementById('x-4').value,document.getElementById('x-5').value,document.getElementById('x-6').value,document.getElementById('x-7').value,document.getElementById('x-8').value,document.getElementById('x-9').value,document.getElementById('x-10').value],
                y: [document.getElementById('y-1').value,document.getElementById('y-2').value,document.getElementById('y-3').value,document.getElementById('y-4').value,document.getElementById('y-5').value,document.getElementById('y-6').value,document.getElementById('y-7').value,document.getElementById('y-8').value,document.getElementById('y-9').value,document.getElementById('y-10').value],
                mode: 'lines+markers',
                name: 'Blank Graph',
                line: {shape: 'spline'},
                connectgaps: true
            };

            var graphdata = [graphtrace];
            var graphlayout = {
                xaxis: {title: document.getElementById('x-label').value, range: [document.getElementById('x-min').value, document.getElementById('x-max').value]},
                yaxis: {title: document.getElementById('y-label').value, range: [document.getElementById('y-min').value, document.getElementById('y-max').value]}
            };

            Plotly.newPlot('blankGraph', graphdata, graphlayout);
        };
        drawGraph();

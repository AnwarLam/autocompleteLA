# autocompleteLA
a javascript autocompletion plugin


it's a simple javascript plugin , required jquery

you have to add the js file autocompleteLA.js to your html page
and use this code to link your javascript table and your input

 $(document).ready(function()
  {
      autoCompletion(IdOfinput,NameOfJsTable);
  });
  
  
  an example:
  
  <p>enter name of sayen:</p>
            <input type="text" name="champ-texte" id="champ-texte" size="20" />
            
  <script type="text/javascript">
        var tabCommand = ['sangoku','raditz','sangohan','baddack','sangoten','nappa','vegeta','trunk','bra','thales','broly','Paragus'];
 $(document).ready(function()
  {
      autoCompletion('champ-texte',tabCommand);
  });

  </script>


<%
  Dim strDocsPhysicalPath = Server.MapPath(".\")
  Dim objFSO              = CreateObject("Scripting.FileSystemObject")
  Dim objFolder           = objFSO.GetFolder(strDocsPhysicalPath)

  For Each objFolderItem In objFolder.SubFolders
    Response.write("<link rel='import' href='" & objFolderItem.Name & "/" & objFolderItem.Name & ".html'>" + chr(13) + chr(10))
  Next
%>

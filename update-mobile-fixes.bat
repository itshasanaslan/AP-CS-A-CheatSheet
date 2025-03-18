@echo off
echo Running mobile sidebar fixes...

REM Create a backup directory
mkdir backups 2>nul

REM Copy the original files to the backup directory
echo Creating backups of original files...
copy unit2.html backups\unit2.html.bak
copy unit3.html backups\unit3.html.bak
copy unit4.html backups\unit4.html.bak
copy unit5.html backups\unit5.html.bak
copy unit6.html backups\unit6.html.bak
copy unit7.html backups\unit7.html.bak
copy unit8.html backups\unit8.html.bak
copy unit9.html backups\unit9.html.bak
copy unit10.html backups\unit10.html.bak

REM Copy unit1.html to each file
echo Updating unit files with mobile sidebar fixes...
copy unit1.html unit2.html
copy unit1.html unit3.html
copy unit1.html unit4.html
copy unit1.html unit5.html
copy unit1.html unit6.html
copy unit1.html unit7.html
copy unit1.html unit8.html
copy unit1.html unit9.html
copy unit1.html unit10.html

echo All unit files have been updated with mobile sidebar fixes.
echo Original files are backed up in the 'backups' directory.
echo IMPORTANT: You will need to manually update the title and content of each unit file.
pause 
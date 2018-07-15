# If node_modules dir exists, delete it.
if test -d ./$1/node_modules
then
  rm -r ./$1/node_modules
fi

# If first arg to script is 'client':
if [ $1 == "client" ]
then
  # If .next dir exists, delete it.
  if test -d ./$1/.next
  then
    rm -r ./$1/.next
  fi
fi

# If node_modules dir exists, delete it.
if test -d node_modules
then
  rm -r node_modules
fi

# If dist dir exists, delete it.
if test -d dist
then
  rm -r dist
fi
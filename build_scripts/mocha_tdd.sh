#!/bin/sh

. `dirname $0`/setup_nodepath.sh
setup_nodepath $1

echo "Running Unit Tests in `pwd`"
PATH=$PATH:/usr/local/bin

files=`find "src/test/javascript" -name "tdd*.js" 2> /dev/null`
if [ -n "$files" ] ; then
  # create results directory
  testdir=build/test-results
  mkdir -p ${testdir}

  # Run TDD Tests
  ${HOME}/node_modules/mocha/bin/mocha -R XUnit -u tdd ${files} | tee ${testdir}/tdd.xml
  stat=$?
  if [ $stat -ne 0 ] ; then
    echo "Test failed"
    exit ${stat}
  fi
else
  echo "No tests found"
fi

echo "Finished OK"

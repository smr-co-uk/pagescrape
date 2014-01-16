
function setup_nodepath() {
	paths=$1
	# setup NODE_PATH
	if [ ${paths} ] ; then 
	  libraries=${paths}
	else
	  libraries=${HOME}/node_modules
	fi
	
	jspaths=`find src -name "javascript" 2> /dev/null`
	sources=
	for jspath in $jspaths ; do
	  sources="$jspath:$sources"
	done
	export NODE_PATH="$sources$libraries"
	#echo "NODE_PATH=$NODE_PATH"
}
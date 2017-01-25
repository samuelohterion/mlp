function arr ( p_fct, pI_size, p_arg0, p_arg1, p_arg2 ) {

	var
	r = [ ];

	for ( var i = 0; i < pI_size; ++i )

		r.push ( p_fct ( i, p_arg0, p_arg1, p_arg2 ) );

	return r;
}

function ball ( p_arrLhs, p_fct, p_arrRhs, p_arg0, p_arg1, p_arg2 ) {

	var
	r = [ ];

	for ( var i = 0; i < p_arrLhs.length; ++i )

		r.push ( p_fct ( p_arrLhs[ i ], p_arrRhs[ i ], p_arg0, p_arg1, p_arg2 ) );

	return r;
}

function call ( p_fct, p_arr, p_arg0, p_arg1, p_arg2 ) {

	var
	c = p_arr[ 0 ];

	for ( var i = 1; i < p_arr.length; ++i )

		c = p_fct ( c, p_arr[ i ], p_arg0, p_arg1, p_arg2 );

	return c;
}

function fall ( p_fct, p_arr, p_arg0, p_arg1, p_arg2 ) {

	var
	r = [ ];

	for ( var i = 0; i < p_arr.length; ++i )

		r.push ( p_fct ( p_arr[ i ], p_arg0, p_arg1, p_arg2 ) );

	return r;
}

function sall ( p_arr, p_fct, p_arg0, p_arg1, p_arg2 ) {

	for ( var i = 0; i < p_arr.length; ++i )

		p_arr[ i ] = p_fct ( p_arr[ i ], p_arg0, p_arg1, p_arg2 );

	return p_arr;
}



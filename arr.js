function arr ( pI_size, pFct_fct = cst ( 0 ), pA_dst = [ ] ) {

	for ( var i = 0; i < pI_size; ++ i )

		pA_dst[ i ] = pFct_fct ( i );

	return pA_dst;
}

function seq ( pI_begin, pI_end, pFct_fct = add ( 0 ), pA_dst = [ ] ) {

	for ( var i = pI_begin; i < pI_end; ++ i )

		pA_dst[ i - pI_begin ] = pFct_fct ( i );

	return pA_dst;
}

function fun ( pFct_fct, pA_src, pA_dst = [ ] ) {

	for ( var i = 0; i < pA_src.length; ++ i )

		pA_dst[ i ] = pFct_fct ( pA_src[ i ] );

	return pA_dst;
}

function rel ( pFct_fct, pA_src1, pA_src2, pA_dst = [ ] ) {

	if ( pA_src1 instanceof Array && pA_src2 instanceof Array ) {

		for ( var i = 0; i < pA_src1.length; ++ i )

			pA_dst[ i ] = pFct_fct( pA_src1[ i ], pA_src2[ i ] );

		return pA_dst;
	}

	if ( pA_src1 instanceof Array ) {

		for ( var i = 0; i < pA_src1.length; ++ i )

			pA_dst[ i ] = pFct_fct( pA_src1[ i ], pA_src2 );

		return pA_dst;
	}

	for ( var i = 0; i < pA_src1.length; ++ i )

		pA_dst[ i ] = pFct_fct( pA_src1, pA_src2[ i ] );

	return pA_dst;
}

function cum ( pFct_fct, pA_src, s = 0 ) {

	var
	i = -1;

	while ( ++ i < pA_src.length )

		s = pFct_fct( s, pA_src[ i ] );

	return s;
}

// some useful functions

function cst ( p_val ) {

	var
	val = p_val;

	return function ( i ) {

		return val;
	};
}

function add ( p_val ) {

	var
	val = p_val;

	return function ( i ) {

		return val + i;
	};
}

function cnt ( ) {

	var
	c = 0;

	return function ( i ) { return ++ c };
}

function pol ( pA_coeff ) {

	var
	coeff = pA_coeff.slice ( );

	return function ( x ) {

		var
		r = 0,
		e = -1,
		p = 1;

		while ( ++ e < coeff.length ) {

			r += coeff[ e ] * p;
			p *= x;
		}

		return r;
	};
}

function sSet ( a ) { return a; }

function sSqr ( a ) { return a * a; }

function rAdd ( a, b ) { return a + b; }

function rSub ( a, b ) { return a - b; }

function rMul ( a, b ) { return a * b; }

function rDiv ( a, b ) { return a / b; }

function round ( a, b = 2 ) { return Math.pow( 10, -b ) * Math.round ( a * Math.pow ( 10, b ) ); }

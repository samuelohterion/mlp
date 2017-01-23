SO = {

	// f( p_lhs, p_rhs ) len = l ? min( p_lhs.len, p_rhs.len ) : max( p_lhs.len, p_rhs.len );



	cfct : function ( p_val, p_bfct ) {

		if ( p_val instanceof Array ) {

			if ( p_val[ 0 ] instanceof Array ) {

				var
				l = p_val.length,
				r = this.cfct( p_val[ 0 ], p_bfct );

				for ( var i = 1; i < l; ++i ) {

					r = p_bfct( r, this.cfct( p_val[ i ], p_bfct ) );
				}

				return r;
			}

			var
			l = p_val.length,
			r = p_val[ 0 ];

			for ( var i = 1; i < l; ++i ) {

				r = p_bfct( r, this.cfct( p_val[ i ], p_bfct ) );
			}

			return r;
		}

		return p_val;
	},

	ufct : function ( p_val, p_ufct ) {

		if ( p_val instanceof Array ) {

			var
			l = p_val.length,
			r = [ ];

			for ( var i = 0; i < l; ++i ) {

				r.push ( this.ufct( p_val[ i ], p_ufct ) );
			}

			return r;
		}

		return p_ufct( p_val );
	},

	bfct : function ( p_lhs, p_rhs, p_bfct, pB_minimumLength = false ) {

		if ( p_lhs instanceof Array ) {

			if ( p_rhs instanceof Array ) {

				var
				lmin = p_lhs.length < p_rhs.length ? p_lhs.length : p_rhs.length;
				r = [ ],
				i = 0;

				while ( i < lmin ) {

					r.push ( this.bfct( p_lhs[ i ], p_rhs[ i ], p_bfct, pB_minimumLength ) );

					++i;
				}

				if ( !pB_minimumLength ) {

					var
					lmax = p_lhs.length < p_rhs.length ? p_rhs.length : p_lhs.length;

					while ( i < lmax ) {

						if( p_lhs.length < p_rhs.length )

							r.push ( this.bfct( p_lhs[ i % lmin], p_rhs[ i ], p_bfct, pB_minimumLength ) );

						else

							r.push ( this.bfct( p_lhs[ i], p_rhs[ i % lmin ], p_bfct, pB_minimumLength ) );

						++i;
					}
				}

				return r;
			}

			var
			l = p_lhs.length,
			r = [ ];

			for ( var i = 0; i < l; ++i ) {

				r.push ( this.bfct( p_lhs[ i ], p_rhs, p_bfct, pB_minimumLength ) );
			}

			return r;
		}

		if ( p_rhs instanceof Array ) {

			var
			l = p_rhs.length,
			r = [ ];

			for ( var i = 0; i < l; ++i ) {

				r.push ( this.bfct( p_lhs, p_rhs[ i ], p_bfct, pB_minimumLength ) );
			}

			return r;
		}

		return p_bfct( p_lhs, p_rhs );
	},

	ofct : function ( p_lhs, p_rhs, p_bfct ) {

		if ( p_lhs instanceof Array ) {

			var
			r = [ ];

			for( var i = 0; i < p_lhs.length; ++i )

				r.push ( this.ofct( p_lhs[ i ], p_rhs, p_bfct ) );

			return r;
		}

		if ( p_rhs instanceof Array ) {

			var
			r = [ ];

			for ( var i = 0; i < p_rhs.length; ++i )

				r.push ( this.ofct( p_lhs, p_rhs[ i ], p_bfct ) );

			return r;
		}

		return p_bfct( p_lhs, p_rhs );
	},

	seq : function ( pI_from, pI_to, p_ufct ) {

		var
		r = [ ];

		for ( var i = pI_from; i < pI_to; ++ i ) {

			r.push ( p_ufct( i ) );
		}

		return r;
	},

	cpy : function ( p_val ) {

		return this.ufct ( p_val, function ( a ) { return a } );
	},

	sum : function ( p_val ) {

		return this.cfct ( p_val, function ( a, b ) { return a + b } );
	},

	prod : function ( p_val ) {

		return this.cfct ( p_val, function ( a, b ) { return a * b } );
	},

	add : function ( p_lhs, p_rhs, pB_minimumLength = false ) {

		return this.bfct( p_lhs, p_rhs, function ( a, b ) { return a + b; }, pB_minimumLength );
	},

	sub : function ( p_lhs, p_rhs, pB_minimumLength = false ) {

		return this.bfct( p_lhs, p_rhs, function ( a, b ) { return a - b; }, pB_minimumLength );
	},

	mul : function ( p_lhs, p_rhs, pB_minimumLength  = false ) {

		return this.bfct( p_lhs, p_rhs, function ( a, b ) { return a * b; }, pB_minimumLength );
	},

	div : function ( p_lhs, p_rhs, pB_minimumLength = false ) {

		return this.bfct( p_lhs, p_rhs, function ( a, b ) { return a / b; }, pB_minimumLength );
	},

	oadd : function ( p_lhs, p_rhs ) {

		return this.ofct ( p_lhs, p_rhs, function ( a, b ) { return a + b } );
	},

	omul : function ( p_lhs, p_rhs ) {

		return this.ofct ( p_lhs, p_rhs, function ( a, b ) { return a * b } );
	}
}

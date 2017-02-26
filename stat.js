function rng ( pI_min, pI_max ) {

	return function ( i ) {

		return pI_min <= i && i < pI_max ? 1 : 0;
	}
}

function pnorm ( pD_mu = 0, pD_sigma = 1, pD_dx = 1 ) {

	return function ( x ) {

		return pD_dx * Math.exp ( - ( x - pD_mu ) * ( x - pD_mu ) / ( 2. * pD_sigma * pD_sigma ) ) / ( Math.sqrt ( 2. * Math.PI ) * pD_sigma );
	}
}

function dnorm ( pD_mu = 0, pD_sigma = 1 ) {

	return pnorm ( pD_mu, pD_sigma );
}

function expVal ( x, p = arr ( x.length, cst ( 1. / x.length ) ) ) {

	return cum ( rAdd, rel ( rMul, x, p ) );
}

function variance ( x, p = arr ( x.length, cst ( 1. / x.length ) ) ) {

	return expVal ( fun ( sSqr, rel ( rSub, x, expVal ( x, p ) ) ), p );
}

function sigma ( x, p ) {

	return Math.sqrt ( variance ( x, p ) );
}



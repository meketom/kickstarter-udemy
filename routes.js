const routes = require('next-routes');

module.exports = routes()
    .add('home', '/', 'index')
    .add('newCampaign', '/campaigns/new', 'campaigns/new')
    .add('detailsCampaign', '/campaigns/:address', 'campaigns/show');

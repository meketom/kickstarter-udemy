const routes = require('next-routes');

module.exports = routes()
    .add('home', '/', 'index')
    .add('newCampaign', '/campaigns/new', 'campaigns/new')
    .add('detailsCampaign', '/campaigns/:address', 'campaigns/show')
    .add('requestsCampaign', '/campaigns/:address/requests', 'campaigns/requests/index')
    .add('addRequestsCampaign', '/campaigns/:address/requests/new', 'campaigns/requests/new');

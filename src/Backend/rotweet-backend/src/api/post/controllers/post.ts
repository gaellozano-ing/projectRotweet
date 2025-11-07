const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to create a post');
    }

    const profile = await strapi.db.query('api::profile.profile').findOne({
      where: { user: user.id },
    });

    if (!profile) {
      return ctx.badRequest('User profile not found');
    }

    ctx.request.body.data.profile = profile.id;

    const response = await super.create(ctx);

    return response;
  },
}));

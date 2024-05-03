
export default {
  beforeCreate(event) {
    const { project_name, locale } = event.params.data;

    if (project_name && locale === 'en') {
      event.params.data.slug = project_name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  },

  async beforeUpdate(event) {
    const { project_name } = event.params.data;
    const existingEntity = await strapi.entityService.findOne('api::project.project', event.params.where.id, {
      fields: ['locale']
    });
    const locale = existingEntity.locale;

    if (project_name && locale === 'en') {
      event.params.data.slug = project_name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  }
}

import * as Yup from 'yup';
import { Op } from 'sequelize';

import Tool from '../models/Tool';

class ToolController {
  // List Tools
  async index(req, res) {
    const { tag } = req.query;

    if (!tag) {
      const tools = await Tool.findAll({
        attributes: ['id', 'title', 'link', 'description', 'tags'],
      });
      return res.json(tools);
    }

    const tools = await Tool.findAll({
      where: {
        tags: {
          // Performs the filter by the tag passed in the url
          [Op.overlap]: [`${tag}`],
        },
      },
      attributes: ['id', 'title', 'link', 'description', 'tags'],
    });

    return res.json(tools);
  }

  // Create Tools
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fails' });
    }

    const { id, title, link, description, tags } = await Tool.create(req.body);

    return res.json({
      id,
      title,
      link,
      description,
      tags,
    });
  }

  // Delete Tool
  async delete(req, res) {
    const { id } = req.params;

    await Tool.destroy({
      where: { id },
    });

    return res.status(204).send();
  }
}

export default new ToolController();

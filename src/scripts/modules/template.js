'use strict';

const colors = `
<% if (data.light.length > 0) { %>
  <section class="display__group display__light-section">
    <h2 class="display__groupname">Light</h2>
    <ul class="display__list">
      <% _.forEach(data.light, function(color) { %>
        <%= color.render %>
      <% }); %>
    </ul>
  </section>
<% } %>

<% if (data.dark.length > 0) { %>
  <section class="display__group display__dark-section">
    <h2 class="display__groupname">Dark</h2>
    <ul class="display__list">
      <% _.forEach(data.dark, function(color) { %>
        <%= color.render %>
      <% }); %>
    </ul>
  </section>
<% } %>
`;

const folders = `
<% _.forEach(data, function(folder) { %>
  <%= folder.render %>
<% }) %>
`

const template = {
  colors,
  folders,
};

module.exports = template;

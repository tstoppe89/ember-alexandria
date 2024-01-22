import { inject as service } from "@ember/service";
import { belongsTo, hasMany, attr } from "@ember-data/model";
import { LocalizedModel, localizedAttr } from "ember-localized-model";

export default class DocumentModel extends LocalizedModel {
  @localizedAttr title;
  @localizedAttr description;
  @attr metainfo;

  @attr createdAt;
  @attr createdByUser;
  @attr createdByGroup;
  @attr modifiedAt;
  @attr modifiedByUser;
  @attr modifiedByGroup;
  @attr date;

  @belongsTo("category", { inverse: "documents", async: true }) category;
  @hasMany("tag", { inverse: "documents", async: true }) tags;
  @hasMany("mark", { inverse: "documents", async: true }) marks;
  @hasMany("file", { inverse: "document", async: true }) files;

  @service("alexandria-config") config;

  get thumbnail() {
    const thumbnail = this.files.filter(
      (file) => file.variant === "thumbnail",
    )[0];
    return thumbnail && thumbnail.downloadUrl;
  }

  get fileLatestCreatedAt() {
    if (!this.files.length) {
      return null;
    }

    return this.files
      .filter((file) => file.variant === "original")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      .createdAt;
  }
}

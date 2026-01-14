import React, { forwardRef } from "react";
import TemplateModern from "./templates/TemplateModern";
import TemplateElegant from "./templates/TemplateElegant";
import TemplateCreative from "./templates/TemplateCreative";
import TemplateProfessional from "./templates/TemplateProfessional";
import TemplateMinimal from "./templates/TemplateMinimal";

const ResumePreview = forwardRef(({ formData, selectedTemplate }, ref) => {
  let TemplateComponent;

  switch (selectedTemplate) {
    case "modern":
      TemplateComponent = TemplateModern;
      break;
    case "elegant":
      TemplateComponent = TemplateElegant;
      break;
    case "creative":
      TemplateComponent = TemplateCreative;
      break;
    case "professional":
      TemplateComponent = TemplateProfessional;
      break;
    case "minimal":
      TemplateComponent = TemplateMinimal;
      break;
    default:
      TemplateComponent = TemplateModern;
  }

  return (
    <div ref={ref}>
      <TemplateComponent data={formData} />
    </div>
  );
});

export default ResumePreview;

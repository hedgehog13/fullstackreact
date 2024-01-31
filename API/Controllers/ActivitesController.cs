

using Application.Activities;
using Domain;

using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class ActivitesController : BaseApiController
    {


        [HttpGet]//api/activities 
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]//api/activities/dfgdjfh
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }



        [HttpPost]
        public async Task CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
           
        }
        [HttpPut("{id}")]
        public async Task EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;
            await Mediator.Send(new Edit.Command { Activity = activity });
           
        }
        [HttpDelete("{id}")]
        public async Task DeleteActivity(Guid id, Activity activity)
        {

            activity.Id = id;
            await Mediator.Send(new Delete.Command { Id = id });
           
        }

    }
}
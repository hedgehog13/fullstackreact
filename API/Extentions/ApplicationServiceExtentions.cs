
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Application.Photos;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(
            //     c =>
            // {

            //     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            //     {
            //         Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
            //         Name = "Authorization",
            //         In = ParameterLocation.Header,
            //         Type = SecuritySchemeType.ApiKey,
            //         Scheme = "Bearer"

            //     });
            //     c.AddSecurityRequirement( new OpenApiSecurityRequirement
            //     {
            //         {
            //             new OpenApiSecurityScheme{
            //                 Reference = new OpenApiReference{
            //                     Type = ReferenceType.SecurityScheme,
            //                     Id="Bearer"
            //                 }
            //             },
            //             new string[]{}
            //         }
            //     });

            // }
            );
            services.AddDbContext<DataContext>(op => { op.UseSqlite(config.GetConnectionString("DefaultConnection")); });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();

            services.AddScoped<IPhotoAccessor, PhotoAccesser>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));


            return services;
        }

    }
}